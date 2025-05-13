# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unrelease]

### Added
- Added `TvRelativeTime` component to display time along with its tooltip
- Update color styles across multiple components for consistency
- Enhance getRelativeTime function and implement auto-update in `TvRelativeTime` component

### Fixed
- Handle null date strings in the `TvRelativeTime` component and update product metadata handling

### Dependencies
- Updated version `@vitejs/plugin-vue` to `5.2.3`
- Updated version `autoprefixer` to `10.4.21`
- Updated version `axios` to `1.8.2`
- Updated version `firebase` to `11.6.1`
- Updated version `pinia` to `3.0.2`
- Updated version `postcss` to `8.5.3`
- Updated version `vite` to `6.2.6`
- Updated version `vue-router` to `4.5.1`
- Updated version `vue3-carousel` to `0.15.0`
- Change dependency `@todovue/tvbutton` to `@todovue/tv-button`
- Change dependency `@todovue/tvlabel` to `@todovue/tv-label`

## [1.8.3] - 10/03/2025

### Fixed
- Fixed the construction of the package description in promos

## [1.8.2] - 26/02/2025

### Changed
- `Button` component is changed to `TvButton`
- `Chip` component is changed to `TvLabel`

## [1.8.1] - 22/02/2025

### Fixed
- Fixed navigation when there are page and size parameters in the URL
- Fixed max letters ins filter by material
- Fixed indentation and improve layout in `filterByColor`
- Fixed maxLength for string trimming and update layout for filter components

## [1.8.0] - 22/02/2025

### Fixed
- Fixed the discount issue in the promo app
- Fixed the issue with similar product selection
- Fixed `v-for` errors where the `:key` was missing
- Removed unused style template
- Fixed missing `alt` attributes in catalog images
- Fixed filter product
- Fixed syntax errors in various Vue components and JavaScript files

### Added
- Added validation to hide the filter when no discounts are available
- Added color filter
- Added pluralization filter
- Added fallback products when no search results are found
- Enhanced similar product retrieval logic to ensure a minimum of 12 items
- Added a Paginator component to improve product navigation in the Search view
- Added material filter component and integrate with existing filter logic

### Changed
- Updated filter styles
- Categories are now displayed separately in product details
- Updated product list display
- Changed image sizes in catalogs
- Display 'Categories' instead of 'Category' when multiple categories exist
- Updated search query to include `isCategory` parameter for better filtering
- Titles now match their original format from the API
- Updated text colors for better visibility in filters and loading states

## [1.7.6] - 13/02/2025

### Fixed
- Deleted a number of WhatsApp unused.

## [1.7.5] - 13/02/2025

### Fixed
- Fixed versioning issues.
- Fixed the display variety color in the product.

### Added
- Added feature flags (temporarily disabled).
- Added `CardService` and `MpPaginationService` components.
- Added a helper with service data.
- Added services (temporarily disabled).

### Changed
- Updated default error image.

## [1.7.4] - 19/07/2024

### Fixed
- Fixed filtering by label in products.

## [1.7.4] - 19/07/2024

### Fixed
- Fix the call filter by label in the products.

## [1.7.3] - 19/07/2024

### Added
- Add filter by label in the products.

### Fixed
- Fix the size image in the product view.
- Fix url in router link.

## [1.7.2] - 10/07/2024

### Changed
- Change the size image in the product view.
- Change items to show in the product view.

### Fixed
- Fix the call api `promoopcion` in update inventory.

## [1.7.1] - 09/07/2024

### Changed
- Comment temporal the button to go to the service page.

## [1.7.0] - 09/07/2024

### Added
- Add page services.
- Add new colors in a list of colors in the product card.
- Add a color name in the tooltip of the product card.
- Add update inventory in `marpico` products.
- Add update inventory in `promoopcion` products.

### Changed
- Change the number of visibility products in similar products.
- Change the style of button iva in the product view.
- Optimized the function color in the product card.
- Edit version in `MpFooter.vue` component.
- Change styles of the product card.
- Change `batchSize` in firebase.

### Fixed
- Fix error in `_normalizeColorName` function.

## [1.6.4] - 09/07/2024

### Added
- Add version in `MpFooter.vue` component.

### Fixed
- Fix call service in an init project.

## [1.6.3] - 08/07/2024

### Fixed
- Fix icon in loading firebase.

## [1.6.2] - 08/07/2024

### Fixed
- Fix key `isLogin` localstorage in the project.

### Changed
- Change styles in modal login.
- Change styles in `MpWhatsapp` component.

## [1.6.1] - 06/07/2024

### Fixed
- Fix the call api to log in in the project.

## [1.6.0] - 18/06/2024

### Changed
- Change the style of the checkbox in the admin page.
- Change the size logo in the main menu.
- Change an input type in a search component.
- Change the style button on the admin page.

### Fixed
- Fix the links to social media in the footer.
- Fix the margin in about info.
- Fix shortcut search in Mac.
- Fix remove image preview when the user removes the image in the admin page.
- Fix the checkbox in the view page.
- Fix the width of the input search.
- Fix error in trim title.

## [1.5.0] - 06/06/2024

### Added
- Add alert when the user filters with no value in to filter.
- Add a button to update the inventory on the admin page.
- Add a function to call two api in the project.
- Add loader when the user is waiting for the response of the all services.
- Add loader when the user is waiting for the response of the products in firebase (only admin).

### Changed
- Delete icons in title pages.
- Change the list of categories on the product page.
- Change the home page.
- Change the button to log in and logout in the project.

### Fixed
- Fix button filter quantity in the products.
- Fix flex wrap in the filter of the products.

## [1.4.0] - 30/05/2024

### Added
- Add the version app in the footer of the project.
- Add `relative-time` component to table of inventory.
- Add a label to the table of inventory the last update.
- Add a download button to the image of the product.
- Add meta-tags to the project.
- Add page admin.
- Add a catalog section on the admin page, add, edit and delete catalogs.
- Add a carousel images section in the admin page, add, edit and delete images.
- Add a menu section on the admin page, add, edit and delete menus.

### Changed
- Change the color of the footer in mobile.

### Fixed
- Fix the image of the product in the product view.

## [1.3.1] - 25/05/2024

### Fixed
- Fix the button to contact.

## [1.3.0] - 24/05/2024

### Added
- Add a tooltip component in the project.
- Add shortcode in the search component.
- Add validation to a search component.
- Add preview images in the product view.
- Add a message to log in and logout in the project.
- Add a toast component in the project.
- Add a copy button in the product view.
- Add api id in the products.
- Add filter by quantity in the products.
- Add filter by discount in the products.
- Add to filters composable in the project.

### Changed
- Change the button to next and prev in the product view.
- Change input to input password in the login form.

### Fixed
- Fix margin in the product card.
- Fix styles in the button preview.

## [1.2.2] - 21/05/2024

### Added
- Add wrap in the list of colors in the product card.

### Fixed
- Delete console.log in the project.
- Solve warning in the project.

## [1.2.1] - 21/05/2024

### Fixed
- Fix the error of a type in helpers.

## [1.2.0] - 21/05/2024

### Added
- Add the lazy component in the project.
- Add a theme component in the project.
- Add a color palette to the product card.
- Add price in the product card.

### Changed
- Change language in the index page.
- Change the name of color in the lowercase.
- Change the color circle to square in the product card.

### Fixed
- Fix the change page in router.
- Fix lint errors in the project.

## [1.1.1] - 20/05/2024

### Fixed
- Fix the call api to log in in the project.

## [1.1.0] - 19/05/2024

### Added
- Add async call of the products in the project.
- Add a speed-dial component.
- Add a WhatsApp button in the footer.
- Add image by default in the products.

### Changed
- Change the autoplay of the carousel in the products.
- Comment temporal the button to charge inventory in the products.

## [1.0.1] - 18/05/2024

### Fixed
- Fix the url images to firebase storage production.
- Fix the list of categories on the product page.
- Fix the type of the props in a badge component.

## [1.0.0] - 18/05/2024

### Added

- Add a new version of the project. With products and services.

[1.8.3]: https://github.com/CristhianDaza/megaprom/pull/32/files
[1.8.2]: https://github.com/CristhianDaza/megaprom/pull/31/files
[1.8.1]: https://github.com/CristhianDaza/megaprom/pull/30/files
[1.8.0]: https://github.com/CristhianDaza/megaprom/pull/29/files
[1.7.6]: https://github.com/CristhianDaza/megaprom/pull/28/files
[1.7.5]: https://github.com/CristhianDaza/megaprom/pull/27/files
[1.7.4]: https://github.com/CristhianDaza/megaprom/pull/26/files
[1.7.3]: https://github.com/CristhianDaza/megaprom/pull/25/files
[1.7.2]: https://github.com/CristhianDaza/megaprom/pull/24/files
[1.7.1]: https://github.com/CristhianDaza/megaprom/pull/23/files
[1.7.0]: https://github.com/CristhianDaza/megaprom/pull/21/files
[1.6.4]: https://github.com/CristhianDaza/megaprom/pull/19/files
[1.6.3]: https://github.com/CristhianDaza/megaprom/pull/18/files
[1.6.2]: https://github.com/CristhianDaza/megaprom/pull/17/files
[1.6.1]: https://github.com/CristhianDaza/megaprom/pull/16/files
[1.6.0]: https://github.com/CristhianDaza/megaprom/pull/15/files
[1.5.0]: https://github.com/CristhianDaza/megaprom/pull/14/files
[1.4.0]: https://github.com/CristhianDaza/megaprom/pull/13/files
[1.3.1]: https://github.com/CristhianDaza/megaprom/pull/9/files
[1.3.0]: https://github.com/CristhianDaza/megaprom/pull/8/files
[1.2.2]: https://github.com/CristhianDaza/megaprom/pull/7/files
[1.2.1]: https://github.com/CristhianDaza/megaprom/pull/6/files
[1.2.0]: https://github.com/CristhianDaza/megaprom/pull/5/files
[1.1.1]: https://github.com/CristhianDaza/megaprom/pull/4/files
[1.1.0]: https://github.com/CristhianDaza/megaprom/pull/3/files
[1.0.1]: https://github.com/CristhianDaza/megaprom/pull/2/files
[1.0.0]: https://github.com/CristhianDaza/megaprom/pull/1/files


