import React, { useState, useEffect } from 'react';
import PopupBack from './BackPopup';
import PromotionPopup from './PopupPromotion';

const ModalContainer = () => {
  // State to track popup visibility
  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const [canShowBackPopup, setCanShowBackPopup] = useState(false);
  const productId = 'global';

  // Function to handle when promotion popup is closed
  const handlePromotionClose = () => {
    setShowPromotionPopup(false);
    // Allow a delay before the back popup can appear
    setTimeout(() => {
      setCanShowBackPopup(true);
    }, 5000); // 5 second delay before back popup can appear
  };

  // Determine if we should show popups on this page
  useEffect(() => {
    // Skip certain routes where we don't want popups
    const skipRoutes = [
      '/obrigado',
      '/login',
      '/registre-se',
      '/politicas-de-privacidade',
      // Add other routes to skip as needed
    ];

    // Get current path
    const currentPath = window.location.pathname;

    // Check if current path is in skip list
    const shouldSkip = skipRoutes.some((route) => currentPath.includes(route));

    if (!shouldSkip) {
      // Check if we've shown promotion popup for this page in this session
      const hasVisitedPage = sessionStorage.getItem(`visited_${currentPath}`);

      if (!hasVisitedPage) {
        // First visit - show promotion popup
        setTimeout(() => {
          setShowPromotionPopup(true);
          setCanShowBackPopup(false);
          sessionStorage.setItem(`visited_${currentPath}`, 'true');
        }, 1000);
      } else {
        // Returning visit - allow back popup
        setShowPromotionPopup(false);
        setCanShowBackPopup(true);
      }
    }

    // Reset popup state
    localStorage.removeItem('popupShown');
  }, []);

  // Only render on paths where we want popups
  const currentPath = window.location.pathname;
  const shouldRender = ![
    '/obrigado',
    '/login',
    '/registre-se',
    '/politicas-de-privacidade',
    // Add other routes to skip as needed
  ].some((route) => currentPath.includes(route));

  if (!shouldRender) return null;

  return (
    <>
      {/* Pass isPromotionOpen as a prop to BackPopup to control its behavior */}
      <PopupBack
        productId={productId}
        isPromotionOpen={showPromotionPopup}
        canOpenPopup={canShowBackPopup}
      />

      {showPromotionPopup && <PromotionPopup onClose={handlePromotionClose} />}
    </>
  );
};

export default ModalContainer;
