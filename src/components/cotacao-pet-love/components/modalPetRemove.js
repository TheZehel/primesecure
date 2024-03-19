export default function ModalRemoverPet({
  pets,
  index,
  onRemovePet,
  cancelRemovePet,
}) {
  if (index === null) {
    return <div className="none"></div>;
  }

  const pet = pets[index];
  const petName = pet.name ? pet.name : "seu pet";

  //console.log(pets[index]);
  //console.log(index);

  const closeModal = () => {
    //console.log(`cancelando remover pet ${index}...`);
    cancelRemovePet();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cancelar-remocao-pet" });
  };
  const confirmModal = () => {
    //console.log(`confirmando remover pet ${index}...`);
    onRemovePet(index);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "pet-excluido" });
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-900 antialiased overflow-hidden z-50">
      <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50"></div>
      <div className="flex fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="m-auto relative w-full max-w-sm max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={closeModal}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Cancelar</span>
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Você deseja remover{" "}
                <span className="font-medium">{petName}</span>?
              </h3>
              <button
                onClick={confirmModal}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-5"
              >
                Remover
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
