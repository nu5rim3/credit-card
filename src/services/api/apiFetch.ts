import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createGoogleUat = (data: any) => {
  return axios
    .post(
      `https://asia-southeast1-warrantyloits-247206.cloudfunctions.net/credit-card-web-image-upload-function-uat`,
      data
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
