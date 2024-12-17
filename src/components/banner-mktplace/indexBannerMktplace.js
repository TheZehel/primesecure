/**
 * Namespace que agrupa todos os módulos e componentes de banner para o Marketplace.
 * Inclui:
 * - {@link module:BannerMktplace.Banner | Banner}
 *
 * @namespace BannerMktplace
 */

/**
 * Componente principal do namespace `BannerMktplace`.
 *
 * Este componente é responsável por renderizar o componente `Banner` dentro de uma `div`.
 *
 * @module IndexBannerMktplace
 * @memberof BannerMktplace
 * @description Este é o componente principal do namespace `BannerMktplace`.
 *
 * @example
 * import IndexBannerMktplace from './IndexBannerMktplace';
 *
 * function App() {
 *   return (
 *     <IndexBannerMktplace />
 *   );
 * }
 *
 * @returns {JSX.Element} Retorna o componente JSX contendo o `Banner`.
 */

import Banner from "./components/Banner";

export default function IndexBannerMktplace() {
  return (
    <div>
      <Banner />
    </div>
  );
}
