import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import ChainedBackend from 'i18next-chained-backend'
import Backend from 'i18next-http-backend'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next';


import translationEn from "./locales/en/translation.json";
import translationEs from "./locales/es/translation.json";

const locals = {en: {translation: translationEn}, vi: {translation: translationEs}}

function csvToJson(csv: any) {
  const lines = csv.split('\n');
  const result = {};

  // Get the headers
  const headers = lines[0].split(',');

  // Convert each line to a key-value pair
  for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');

      // Check if the line has the same number of values as headers
      if (currentLine.length === headers.length) {
        // @ts-ignore
          result[currentLine[0].trim()] = currentLine[1].trim();
      }
  }
  return result;
}


const options = {
  backends: [Backend, resourcesToBackend(locals)],
  backendOptions: [
      {
          loadPath: `https://docs.google.com/spreadsheets/d/e/2PACX-1vRubXE3_O5MbN67nkegQ_i1OeBlUtW1kI2KAHc9arykFnPW973kOW85fd3vnvfWhJiiz5v_GrSPzed6/pub?gid=0&single=true&output=csv`,
          requestOptions: {
              method: 'GET',
          },
          parse: (data: any, lng: any) => {
            // @ts-ignore
            const local = locals[lng].translation || {};
              try {
                const parseData = csvToJson(data);
                // console.log(parseData);
                // if(lng !== 'en'){
                //   return local;
                // }
                const res = {...local, ...parseData}; // Trả về dữ liệu từ API
                console.log(res, lng);
                return res; // Trả về dữ liệu từ API
              } catch (e) {
                  console.error('Error parsing translation data:', e);
                  return local;
              }
          },
      },
  ],
}

let currentLanguage = 'en';

const config = async () => {
  await i18n
      .use(ChainedBackend)
      .use(initReactI18next) // Kết nối với React
      .init({
          supportedLngs: ['en', 'es'],
          nonExplicitSupportedLngs: true,
          react: {
              useSuspense: false,
          },
          debug: false,
          lng: currentLanguage,
          backend: options,
          keySeparator: '.',
          fallbackLng: 'en',
          interpolation: {
              escapeValue: false,
          },
      });
};


export default {
  config,
};