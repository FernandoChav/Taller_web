import { ObjectParameters } from "../entities/object.parameters";

export class UrlUtil {

    private constructor () {}

    public static buildUrl(parameters? : ObjectParameters) : string {
          if(parameters == null){
            return "";
          }

          var result = "?";
          var map =  parameters.getParameters();

          map.forEach((value, key) => {
                result += key + "=" + value + "&";
          });

          return result.substring(0, result.length - 1);
    }

}