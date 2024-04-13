// 웹 앱의 성능을 측정하고 모니터링하는 데 사용.
// 웹 사이트의 Core Web Vitals를 측정하여 사용자 경험을 개선하는 데 도움
// getCLS: Cumulative Layout Shift (CLS)
// getFID: First Input Delay (FID)
// getFCP: First Contentful Paint (FCP)
// getLCP: Largest Contentful Paint (LCP)
// getTTFB: Time to First Byte (TTFB)
// 측정 항목들은 사용자 경험을 향상시키고 웹 사이트의 성능을 최적화하는 데 중요한 지표들입니다. 
// 이 코드는 onPerfEntry 함수를 사용하여 측정값을 전달하고, web-vitals 패키지를 동적으로 가져와서 해당 측정값을 추출하고 전달합니다. 
// 최종적으로, 이러한 측정값들은 성능 모니터링 도구에 전달되어 웹 앱의 성능을 분석하고 개선할 수 있도록 합니다.
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
