/**
 * The package @types/lodash.merge's types are broken.
 * That's why I'm using a custom module type declaration
 */
declare module "lodash.merge" {
  import { merge } from "lodash";
  export default merge;
}
