import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupBack from '../globalsubcomponentes/BackPopup';
import PromotionPopup from '../globalsubcomponentes/PopupPromotion';
import {
  closePromotionPopupWithCooldown,
  enableBackPopup,
  openPromotionPopup,
} from '../../redux/slices/popupsSlice';

const ModalContainer = () => {
  const dispatch = useDispatch();
  const promotionPopupOpen = useSelector(
    (state) => state.popups.promotionPopupOpen,
  );
  const backPopupAllowed = useSelector(
    (state) => state.popups.backPopupAllowed,
  );

  useEffect(() => {
    const skipRoutes = [
      '/obrigado',
      '/login',
      '/registre-se',
      '/politicas-de-privacidade',
    ];
    const currentPath = window.location.pathname;
    const shouldSkip = skipRoutes.some((route) => currentPath.includes(route));

    if (!shouldSkip) {
      const hasVisitedPage = sessionStorage.getItem(`visited_${currentPath}`);
      if (!hasVisitedPage) {
        setTimeout(() => {
          dispatch(openPromotionPopup());
          sessionStorage.setItem(`visited_${currentPath}`, 'true');
        }, 1000);
      } else {
        dispatch(enableBackPopup());
      }
    }
    localStorage.removeItem('popupShown');
  }, [dispatch]);

  return (
    <>
      {promotionPopupOpen ? (
        <PromotionPopup
          onClose={() => dispatch(closePromotionPopupWithCooldown())}
        />
      ) : backPopupAllowed ? (
        // Passa isPromotionOpen para que o PopupBack saiba quando a promoção está fechada
        <PopupBack productId="global" isPromotionOpen={promotionPopupOpen} />
      ) : null}
    </>
  );
};

export default ModalContainer;
