# 🚦 Lighthouse CI - Automated Performance Monitoring

## Overview
Lighthouse CI automatically runs performance audits on every push and pull request, ensuring performance standards are maintained.

## What Gets Tested

### Performance Metrics (Target: 90+)
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 300ms
- **Speed Index**: < 3s

### Quality Metrics
- **Accessibility**: 95+ (WCAG AA compliance)
- **Best Practices**: 95+ (Security, modern standards)
- **SEO**: 100 (Search engine optimization)

## How It Works

### Automatic Triggers
1. **Push to main/master**: Full audit runs
2. **Pull Request**: Audit runs and comments on PR
3. **Manual**: Can be triggered via GitHub Actions UI

### Workflow Steps
1. Checkout code
2. Install dependencies
3. Build production bundle
4. Start server
5. Run Lighthouse (3 times, median score)
6. Upload results
7. Fail if thresholds not met

## Configuration

### lighthouserc.json
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,  // Run 3 times for consistency
      "settings": {
        "preset": "desktop",  // Desktop configuration
        "throttling": {
          "rttMs": 40,  // Fast 4G
          "throughputKbps": 10240
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}]
      }
    }
  }
}
```

### Thresholds (Fail Build If)
- Performance < 90
- Accessibility < 95
- Best Practices < 95
- SEO < 100
- FCP > 1.5s
- LCP > 2.5s
- CLS > 0.1

## Viewing Results

### GitHub Actions
1. Go to Actions tab
2. Click on Lighthouse CI workflow
3. View summary and detailed results
4. Download artifacts for full report

### Pull Request Comments
Lighthouse CI automatically comments on PRs with:
- Score comparison (before/after)
- Performance regression warnings
- Link to full report

### Temporary Public Storage
Results are uploaded to temporary public storage:
- Available for 7 days
- Shareable link in workflow output
- No authentication required

## Local Testing

### Run Lighthouse Locally
```bash
# Install Lighthouse CLI
npm install -g @lhci/cli

# Build and start server
npm run build
npm start

# Run Lighthouse CI
lhci autorun
```

### Quick Lighthouse Audit
```bash
# Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select categories
4. Click "Analyze page load"
```

## Troubleshooting

### Build Fails on Lighthouse CI

**Problem**: Lighthouse score below threshold  
**Solution**:
1. Check which metric failed
2. Run local audit to reproduce
3. Fix performance issues
4. Re-run CI

**Common Issues**:
- Large bundle size → Code splitting
- Unoptimized images → WebP + lazy loading
- Blocking scripts → Async/defer
- Poor CLS → Fixed dimensions on images/videos

### CI Takes Too Long

**Problem**: Workflow timeout  
**Solution**:
1. Reduce `numberOfRuns` from 3 to 1
2. Increase `startServerReadyTimeout`
3. Optimize build time

### Inconsistent Scores

**Problem**: Scores vary between runs  
**Solution**:
- Lighthouse runs 3 times and takes median
- Disable animations during CI
- Use consistent throttling settings

## Performance Budget Enforcement

### Automatic Checks
- ✅ Bundle size monitoring
- ✅ Core Web Vitals tracking
- ✅ Accessibility compliance
- ✅ SEO best practices

### Regression Prevention
- Fails build if performance drops
- Prevents merging slow code
- Maintains quality standards

## Integration with Vercel

### Vercel + Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
- name: Run Lighthouse on Vercel Preview
  uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      ${{ steps.vercel.outputs.preview-url }}
```

### Benefits
- Test production-like environment
- Real CDN performance
- Accurate metrics

## Best Practices

### 1. Run on Every PR
Catch performance regressions early

### 2. Set Realistic Thresholds
Don't set 100 if current score is 85

### 3. Monitor Trends
Track performance over time

### 4. Fix Regressions Immediately
Don't let technical debt accumulate

### 5. Educate Team
Share Lighthouse reports in PR reviews

## Metrics Explained

### First Contentful Paint (FCP)
Time until first text/image appears  
**Target**: < 1.5s  
**Impact**: User perceives page is loading

### Largest Contentful Paint (LCP)
Time until largest element appears  
**Target**: < 2.5s  
**Impact**: Core Web Vital, affects SEO

### Cumulative Layout Shift (CLS)
Visual stability during load  
**Target**: < 0.1  
**Impact**: Core Web Vital, user experience

### Total Blocking Time (TBT)
Time main thread is blocked  
**Target**: < 300ms  
**Impact**: Interactivity, responsiveness

### Speed Index
How quickly content is visually displayed  
**Target**: < 3s  
**Impact**: Perceived performance

## Cost & Limits

### GitHub Actions
- **Free Tier**: 2,000 minutes/month
- **Lighthouse CI**: ~5 minutes per run
- **Estimate**: ~400 runs/month free

### Optimization
- Run only on main branch + PRs
- Skip on draft PRs
- Use caching for dependencies

## Next Steps

1. ✅ Lighthouse CI configured
2. ✅ **Package installed and scripts added** (2026-01-19)
3. ✅ **Configuration file ready** (`lighthouserc.json`)
4. ⏳ Push to GitHub to trigger first run (requires Chrome in CI environment)
5. ⏳ Review results and adjust thresholds
6. ⏳ Set up Slack/email notifications
7. ⏳ Integrate with Vercel previews

---

**Status**: ✅ Implemented & Ready for CI/CD  
**Local Test**: ⚠️ Requires Chrome installation (use GitHub Actions instead)  
**Last Updated**: 2026-01-19  
**Owner**: Development Team

## Local Testing Alternative

Since Lighthouse CI requires Chrome, use these alternatives for local testing:

### Option 1: Chrome DevTools Lighthouse
1. Open site in Chrome
2. Press F12 → Lighthouse tab
3. Select categories → Analyze

### Option 2: Install Chrome for CLI
```bash
# Windows (Chocolatey)
choco install googlechrome

# Then run
npm run lighthouse
```

### Option 3: Use GitHub Actions (Recommended)
Push to GitHub and let CI run Lighthouse automatically with proper Chrome installation.
