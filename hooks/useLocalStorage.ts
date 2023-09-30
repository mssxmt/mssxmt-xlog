'use client';
import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  // localStorage からデータを取得
  const storedValue = localStorage.getItem(key);

  // 初期値を設定
  const initial: string = storedValue ? storedValue : initialValue;

  // 状態とセッターメソッドを作成
  const [value, setValue] = useState<string>(initial);

  // 値が変更されたときに localStorage に保存
  const setStoredValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return { value, setStoredValue };
};
