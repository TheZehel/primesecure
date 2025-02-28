import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PopupPromotion from './PopupPromotion';
import PopupBack from './BackPopup';
import { closePromotion } from './modalSlice';

const insuranceRoutes = [
  '/primetravel',
  '/seguro-de-vida',
  '/seguro-pet-porto',
  '/seguro-residencial-porto-2',
  '/equipamentos-portateis-3',
  '/sulamerica-odonto',
  '/seguro-bike',
  '/consorcio-imovel',
  '/consorcio-auto',
  '/seguro-vida-omint',
];

const ModalContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isPromotionOpen = useSelector((state) => state.modal.isPromotionOpen);

  if (!insuranceRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      {isPromotionOpen ? (
        <PopupPromotion onClose={() => dispatch(closePromotion())} />
      ) : (
        <PopupBack isPromotionOpen={isPromotionOpen} productId="algum-id" />
      )}
    </>
  );
};

export default ModalContainer;
