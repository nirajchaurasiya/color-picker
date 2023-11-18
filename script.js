const to_insert_data = document.getElementById("insert_data");

fetch("/random-colors.json")
  .then((response) => response.json())
  .then((parse) => {
    for (const [key, value] of Object.entries(parse)) {
      const colorElement = document.createElement("div");
      colorElement.className = "lg:w-1/11 md:w-1/11 m-auto color-item";
      colorElement.innerHTML = `
        <div class="h-full flex flex-col items-center text-center">
          <div
            alt="team"
            class="flex-shrink-0 rounded-lg w-full h-32 w-32 object-cover object-center mb-1 cursor-pointer"
            style="background-color: ${value};"
          ></div>
          <h2 class="title-font -mt-8 font-medium text-lg text-gray-300 mb-3">
              ${value}
            </h2>
           
        </div>
      `;

      colorElement.addEventListener("click", () => {
        copyToClipboard(value);
        showNotification(`Color ${value} copied to clipboard!`);
      });

      to_insert_data.appendChild(colorElement);
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

function copyToClipboard(text) {
  const dummyElement = document.createElement("textarea");
  document.body.appendChild(dummyElement);
  dummyElement.value = text;
  dummyElement.select();
  document.execCommand("copy");
  document.body.removeChild(dummyElement);
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end";

  notification.innerHTML = `
    <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
      <div class="rounded-lg shadow-xs overflow-hidden">
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm leading-5 font-medium text-gray-900">
                ${message}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                onclick="this.parentElement.parentElement.remove();"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 500);
}
