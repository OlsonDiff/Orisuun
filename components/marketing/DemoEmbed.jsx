'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const DemoEmbed = () => {
  const scriptsLoadedRef = useRef(false);

  useEffect(() => {
    if (!scriptsLoadedRef.current) {
      const script1 = document.createElement('script');
      script1.src = 'https://fast.wistia.com/embed/medias/cwdiua3bmc.jsonp';
      script1.defer = true;
      script1.async = true;
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
      script2.defer = true;
      script2.async = true;
      document.body.appendChild(script2);

      scriptsLoadedRef.current = true;

      return () => {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
      };
    }
  }, []);

  return (
    <div
      className="wistia_responsive_padding"
      style={{ padding: '56.25% 0 0 0', position: 'relative' }}
    >
      <div
        className="wistia_responsive_wrapper"
        style={{
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      >
        <div
          className="wistia_embed wistia_async_cwdiua3bmc seo=true videoFoam=true"
          style={{ height: '100%', position: 'relative', width: '100%' }}
        >
          <div
            className="wistia_swatch"
            style={{
              height: '100%',
              left: 0,
              opacity: 0,
              overflow: 'hidden',
              position: 'absolute',
              top: 0,
              transition: 'opacity 200ms',
              width: '100%',
            }}
          >
            <Image
              src="https://fast.wistia.com/embed/medias/cwdiua3bmc/swatch"
              style={{
                filter: 'blur(5px)',
                objectFit: 'contain',
              }}
              fill
              alt=""
              aria-hidden="true"
              onLoadingComplete={() => {
                const swatch = document.querySelector('.wistia_swatch');
                if (swatch) {
                  swatch.style.opacity = '1';
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoEmbed;
