/**
 * Script de test automatique des URLs du sitemap
 * Vérifie que toutes les pages générées retournent un status 200
 * 
 * Usage: npx tsx scripts/test-urls.ts [--base-url=URL] [--concurrency=N]
 */

import { XMLParser } from 'fast-xml-parser';

// Configuration
const DEFAULT_BASE_URL = 'http://localhost:3000';
const DEFAULT_CONCURRENCY = 50;
const TIMEOUT_MS = 10000;

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

interface TestResult {
  url: string;
  status: number | 'error' | 'timeout';
  duration: number;
  error?: string;
}

interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  errors: TestResult[];
  duration: number;
}

// Parse command line arguments
function parseArgs(): { baseUrl: string; concurrency: number } {
  const args = process.argv.slice(2);
  let baseUrl = DEFAULT_BASE_URL;
  let concurrency = DEFAULT_CONCURRENCY;

  for (const arg of args) {
    if (arg.startsWith('--base-url=')) {
      baseUrl = arg.split('=')[1];
    } else if (arg.startsWith('--concurrency=')) {
      concurrency = parseInt(arg.split('=')[1], 10);
    }
  }

  return { baseUrl, concurrency };
}

// Fetch and parse sitemap
async function fetchSitemap(baseUrl: string): Promise<string[]> {
  console.log(`📥 Fetching sitemap from ${baseUrl}/sitemap.xml...`);
  
  const response = await fetch(`${baseUrl}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status}`);
  }

  const xml = await response.text();
  const parser = new XMLParser();
  const result = parser.parse(xml);

  // Handle both single URL and array of URLs
  const urlset = result.urlset?.url || [];
  const urls: string[] = Array.isArray(urlset) 
    ? urlset.map((u: SitemapUrl) => u.loc)
    : [urlset.loc];

  console.log(`✅ Found ${urls.length} URLs in sitemap\n`);
  return urls;
}

// Test a single URL
async function testUrl(url: string): Promise<TestResult> {
  const start = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(url, { 
      signal: controller.signal,
      headers: { 'User-Agent': 'MonJoel-URLTester/1.0' }
    });
    
    clearTimeout(timeoutId);
    
    return {
      url,
      status: response.status,
      duration: Date.now() - start,
    };
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === 'AbortError';
    return {
      url,
      status: isTimeout ? 'timeout' : 'error',
      duration: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Test URLs in batches
async function testUrlsInBatches(
  urls: string[], 
  concurrency: number,
  onProgress: (tested: number, total: number) => void
): Promise<TestResult[]> {
  const results: TestResult[] = [];
  
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(testUrl));
    results.push(...batchResults);
    onProgress(results.length, urls.length);
  }

  return results;
}

// Progress bar
function printProgress(tested: number, total: number, failed: number): void {
  const percent = Math.round((tested / total) * 100);
  const barLength = 40;
  const filled = Math.round((tested / total) * barLength);
  const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
  
  const failedStr = failed > 0 ? ` | ❌ ${failed} failed` : '';
  process.stdout.write(`\r[${bar}] ${percent}% (${tested}/${total})${failedStr}`);
}

// Generate summary
function generateSummary(results: TestResult[], startTime: number): TestSummary {
  const errors = results.filter(r => r.status !== 200);
  
  return {
    total: results.length,
    passed: results.length - errors.length,
    failed: errors.length,
    errors,
    duration: Date.now() - startTime,
  };
}

// Print summary
function printSummary(summary: TestSummary): void {
  console.log('\n\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total URLs tested: ${summary.total}`);
  console.log(`✅ Passed: ${summary.passed}`);
  console.log(`❌ Failed: ${summary.failed}`);
  console.log(`⏱️  Duration: ${(summary.duration / 1000).toFixed(1)}s`);
  console.log(`📈 Rate: ${(summary.total / (summary.duration / 1000)).toFixed(1)} URLs/sec`);
  
  if (summary.errors.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('❌ FAILED URLs:');
    console.log('-'.repeat(60));
    
    // Group by status
    const byStatus = new Map<string | number, TestResult[]>();
    for (const error of summary.errors) {
      const key = error.status.toString();
      if (!byStatus.has(key)) byStatus.set(key, []);
      byStatus.get(key)!.push(error);
    }

    for (const [status, urls] of byStatus) {
      console.log(`\n[${status}] - ${urls.length} URLs:`);
      // Show first 10 URLs for each status
      for (const result of urls.slice(0, 10)) {
        console.log(`  • ${result.url}`);
        if (result.error) console.log(`    Error: ${result.error}`);
      }
      if (urls.length > 10) {
        console.log(`  ... and ${urls.length - 10} more`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
}

// Main function
async function main(): Promise<void> {
  const { baseUrl, concurrency } = parseArgs();
  
  console.log('🧪 MonJoel URL Tester');
  console.log('='.repeat(60));
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Concurrency: ${concurrency}`);
  console.log('='.repeat(60) + '\n');

  try {
    const urls = await fetchSitemap(baseUrl);
    
    if (urls.length === 0) {
      console.log('⚠️  No URLs found in sitemap');
      process.exit(0);
    }

    console.log('🚀 Testing URLs...\n');
    const startTime = Date.now();
    let failedCount = 0;

    const results = await testUrlsInBatches(urls, concurrency, (tested, total) => {
      failedCount = results?.filter(r => r.status !== 200).length || 0;
      printProgress(tested, total, failedCount);
    });

    const summary = generateSummary(results, startTime);
    printSummary(summary);

    // Exit with error code if there are failures
    process.exit(summary.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
