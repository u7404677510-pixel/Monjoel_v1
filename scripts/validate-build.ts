/**
 * Script de validation du build Next.js
 * Vérifie le nombre de pages générées et la structure
 * 
 * Usage: npx tsx scripts/validate-build.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Configuration
const BUILD_DIR = '.next';
const EXPECTED_MIN_PAGES = {
  serrurier: 5000,  // 328 villes × 18 services minimum
  plombier: 1500,   // 328 villes × 5 services
  electricien: 1500 // 328 villes × 6 services
};

interface ValidationResult {
  category: string;
  check: string;
  passed: boolean;
  details: string;
}

interface BuildStats {
  totalRoutes: number;
  staticPages: number;
  dynamicPages: number;
  byTrade: Record<string, number>;
}

// Check if build directory exists
function checkBuildExists(): ValidationResult {
  const exists = fs.existsSync(BUILD_DIR);
  return {
    category: 'Build',
    check: 'Build directory exists',
    passed: exists,
    details: exists ? `${BUILD_DIR} found` : `${BUILD_DIR} not found - run npm run build first`,
  };
}

// Count generated pages from .next directory
function countGeneratedPages(): BuildStats {
  const stats: BuildStats = {
    totalRoutes: 0,
    staticPages: 0,
    dynamicPages: 0,
    byTrade: {
      serrurier: 0,
      plombier: 0,
      electricien: 0,
    },
  };

  // Read routes manifest
  const routesManifestPath = path.join(BUILD_DIR, 'routes-manifest.json');
  if (fs.existsSync(routesManifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(routesManifestPath, 'utf-8'));
    stats.staticPages = manifest.staticRoutes?.length || 0;
    stats.dynamicPages = manifest.dynamicRoutes?.length || 0;
  }

  // Count prerendered pages
  const prerenderManifestPath = path.join(BUILD_DIR, 'prerender-manifest.json');
  if (fs.existsSync(prerenderManifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(prerenderManifestPath, 'utf-8'));
    const routes = Object.keys(manifest.routes || {});
    stats.totalRoutes = routes.length;

    // Count by trade
    for (const route of routes) {
      if (route.startsWith('/serrurier/')) stats.byTrade.serrurier++;
      else if (route.startsWith('/plombier/')) stats.byTrade.plombier++;
      else if (route.startsWith('/electricien/')) stats.byTrade.electricien++;
    }
  }

  return stats;
}

// Validate page counts
function validatePageCounts(stats: BuildStats): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Total pages check
  const totalExpected = Object.values(EXPECTED_MIN_PAGES).reduce((a, b) => a + b, 0);
  results.push({
    category: 'Pages',
    check: 'Total pages generated',
    passed: stats.totalRoutes >= totalExpected,
    details: `${stats.totalRoutes} pages (expected: >${totalExpected})`,
  });

  // By trade checks
  for (const [trade, expected] of Object.entries(EXPECTED_MIN_PAGES)) {
    const actual = stats.byTrade[trade] || 0;
    results.push({
      category: 'Pages',
      check: `${trade} pages`,
      passed: actual >= expected,
      details: `${actual} pages (expected: >${expected})`,
    });
  }

  return results;
}

// Check sitemap exists and has content
function validateSitemap(): ValidationResult {
  const sitemapPath = path.join(BUILD_DIR, 'server', 'app', 'sitemap.xml');
  const altPath = path.join(BUILD_DIR, 'static', 'sitemap.xml');
  
  // Next.js generates sitemap dynamically, check route exists
  const routesManifestPath = path.join(BUILD_DIR, 'routes-manifest.json');
  if (fs.existsSync(routesManifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(routesManifestPath, 'utf-8'));
    const hasSitemap = manifest.staticRoutes?.some((r: { page: string }) => r.page === '/sitemap.xml') ||
                       manifest.dynamicRoutes?.some((r: { page: string }) => r.page === '/sitemap.xml');
    
    return {
      category: 'SEO',
      check: 'Sitemap route exists',
      passed: !!hasSitemap,
      details: hasSitemap ? 'sitemap.xml route configured' : 'sitemap.xml route not found',
    };
  }

  return {
    category: 'SEO',
    check: 'Sitemap',
    passed: false,
    details: 'Could not verify sitemap',
  };
}

// Check robots.txt route
function validateRobots(): ValidationResult {
  const routesManifestPath = path.join(BUILD_DIR, 'routes-manifest.json');
  if (fs.existsSync(routesManifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(routesManifestPath, 'utf-8'));
    const hasRobots = manifest.staticRoutes?.some((r: { page: string }) => r.page === '/robots.txt');
    
    return {
      category: 'SEO',
      check: 'Robots.txt route exists',
      passed: !!hasRobots,
      details: hasRobots ? 'robots.txt route configured' : 'robots.txt route not found',
    };
  }

  return {
    category: 'SEO',
    check: 'Robots.txt',
    passed: false,
    details: 'Could not verify robots.txt',
  };
}

// Print results
function printResults(results: ValidationResult[], stats: BuildStats): void {
  console.log('\n🔍 BUILD VALIDATION REPORT');
  console.log('='.repeat(60));
  
  // Stats summary
  console.log('\n📊 Build Statistics:');
  console.log(`   Total prerendered pages: ${stats.totalRoutes}`);
  console.log(`   Serrurier pages: ${stats.byTrade.serrurier}`);
  console.log(`   Plombier pages: ${stats.byTrade.plombier}`);
  console.log(`   Électricien pages: ${stats.byTrade.electricien}`);

  // Group by category
  const byCategory = new Map<string, ValidationResult[]>();
  for (const result of results) {
    if (!byCategory.has(result.category)) byCategory.set(result.category, []);
    byCategory.get(result.category)!.push(result);
  }

  for (const [category, checks] of byCategory) {
    console.log(`\n📁 ${category}:`);
    for (const check of checks) {
      const icon = check.passed ? '✅' : '❌';
      console.log(`   ${icon} ${check.check}`);
      console.log(`      ${check.details}`);
    }
  }

  // Summary
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const allPassed = passed === total;

  console.log('\n' + '='.repeat(60));
  console.log(`📋 SUMMARY: ${passed}/${total} checks passed`);
  console.log(allPassed ? '✅ All validations passed!' : '❌ Some validations failed');
  console.log('='.repeat(60) + '\n');
}

// Main function
async function main(): Promise<void> {
  console.log('🧪 MonJoel Build Validator');
  console.log('='.repeat(60));

  const results: ValidationResult[] = [];

  // Check build exists
  const buildCheck = checkBuildExists();
  results.push(buildCheck);

  if (!buildCheck.passed) {
    printResults(results, { totalRoutes: 0, staticPages: 0, dynamicPages: 0, byTrade: {} });
    process.exit(1);
  }

  // Count pages
  const stats = countGeneratedPages();

  // Validate page counts
  results.push(...validatePageCounts(stats));

  // Validate SEO
  results.push(validateSitemap());
  results.push(validateRobots());

  // Print results
  printResults(results, stats);

  // Exit code
  const allPassed = results.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
}

main();
