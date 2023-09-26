
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
          {
            coffee: {
              ...require("daisyui/src/theming/themes")["[data-theme=coffee]"],
              "base-content": "#A99F8F"
            },
          },
          "autumn"
        ],
      },
};  