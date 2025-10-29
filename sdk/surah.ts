import { api } from "@/utils/axios";
import axios from "axios";

export const getSurahVerses = async (surahNumber: string) => {
  try {
    const { data } = await api.get(
      `/quran/verses/imlaei?chapter_number=${surahNumber}`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const surahVersesTranslation = async (surahID: string) => {
  try {
    const { data } = await api.get(
      `/quran/translations/131?fields=id,chapter_id,verse_number,verse_key,verse_index&chapter_number=${surahID}`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const getRandomAyah = async () => {
  try {
    const { data } = await api.get(
      `/verses/random?language=en&fields=id,chapter_id,verse_number,verse_key,verse_index,text_uthmani,text_indopak,text_uthmani_simple,juz_number,hizb_number,rub_number,audio&translations=131`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const getChapter = async (chapterNumber: string) => {
  try {
    const { data } = await api.get(`/chapters/${chapterNumber}`);
    return data.chapter;
  } catch (error) {
    return null;
  }
};

export const getTafsir = async (verse_key: string) => {
  try {
    const { data } = await api.get(`/quran/tafsirs/93?verse_key=${verse_key}`);
    return data.tafsirs;
  } catch (error) {
    return null;
  }
};

export const getJuzData = async (juzNumber: string) => {
  try {
    const { data } = await axios.get(
      `https://api.alquran.cloud/v1/juz/${juzNumber}/ar.alafasy`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
