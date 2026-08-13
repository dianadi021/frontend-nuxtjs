import type { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export const useNotify = () => {
  const { $swal } = useNuxtApp();

  function showSwal(options: Record<string, any> = {}) {
    return $swal.fire(options);
  }

  function showLoading() {
    if (!$swal.isLoading()) {
      showSwal({
        html: `Loading, Mohon tunggu...`,
        allowOutsideClick: false,
        showCancelButton: false,
        showCloseButton: false,
        allowEscapeKey: false,
        didOpen: function () {
          $swal.showLoading();
        },
      });
    }
  }

  function hideLoading() {
    if ($swal.isLoading() && $swal.isVisible()) {
      $swal.close();
      setTimeout(function () {
        $swal.hideLoading();
      }, 1000);
    }
  }

  return { showSwal, showLoading, hideLoading };
};
