import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadBackendCart } from "../data/cart.js";
// import '../data/backend-practice.js'


async function loadPage() {
  try {
    // throw 'error1';
    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadBackendCart(() => {
        // reject('error3');
        resolve('value3');
      });
    });
  } catch (error) {
    console.error('Error loading page: ', error);
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();


// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadBackendCart(() => {
//       resolve();
//     });
//   })
// ]).then((values) => {
//   console.log(values);
//   renderOrderSummary();
//   renderPaymentSummary();
// });


// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1');
//   });

// }).then((value) => {
//   console.log(value);
//   return new Promise((resolve) => {
//     loadBackendCart(() => {
//       resolve();
//     });
//   });

// }).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// loadProducts(() => {
//   loadBackendCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });