"use client";

import Image from "next/image";
import "./globals.css";
import React, { useState } from "react";

const RoundDecimal = () => {
  const [text, setText] = useState("");
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [result, setResult] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDecimalPlacesChange = (event) => {
    const value = event.target.value;
    const min = 0;
    const max = 10;

    if (value < min || value > max) {
      setWarningMessage(`入力値は${min}から${max}の範囲内にしてください．`);
    } else {
      setWarningMessage("");
      setDecimalPlaces(event.target.value);
    }
  };

  const roundDecimals = () => {
    const regex = /(\d+\.\d+)/g;
    const rounded = text.replace(regex, (match) => {
      // マッチした数値を浮動小数点数に変換
      var number = parseFloat(match);

      // 指定された小数点以下の桁数まで数値を丸める
      var multiplier = Math.pow(10, decimalPlaces);
      var roundedNumber = Math.round(number * multiplier) / multiplier;

      // 丸めた数値を文字列型に
      roundedNumber = roundedNumber.toString();

      if (roundedNumber.indexOf(".") === -1 && decimalPlaces > 0) {
        roundedNumber += ".";
      }
      // 数値が小数点以下n桁まで存在するかどうかをチェック
      var decimalIndex = roundedNumber.indexOf(".");
      var decimalLength = roundedNumber.length - decimalIndex - 1;
      if (decimalLength < decimalPlaces) {
        // 不足している桁数を計算
        var zeroesToAdd = decimalPlaces - decimalLength;
        // 不足している桁数だけ0を追加
        for (var i = 0; i < zeroesToAdd; i++) {
          roundedNumber += "0";
        }
      }
      return roundedNumber;
    });

    setResult(rounded);
  };

  function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  return (
    <div>
      <h1 className="text-center">小数丸めツール</h1>
      <p className="text-center">
        小数を含むテキストと精度を入力すると，テキスト中の小数が指定された精度になるよう四捨五入されます．
      </p>
      <br />
      <div className="flex flex-col items-center space-y-4">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="小数を含むテキスト"
          className="w-full md:w-3/4 h-96 p-2 border border-gray-300 rounded-md resize-none"
          style={{ whiteSpace: "pre-wrap" }}
          aria-label="小数を含む入力テキスト"
        />

        <p>精度（小数点以下○桁）</p>
        <input
          type="number"
          value={decimalPlaces}
          onChange={handleDecimalPlacesChange}
          placeholder="丸めたい小数点以下の桁数"
          className="w-full md:w-16 p-2 border border-gray-300 rounded-md"
          aria-label="丸めたい小数点以下の桁数"
          min="0"
          max="100"
        />
        {warningMessage && (
          <p className="text-red-500 text-sm mt-2">{warningMessage}</p>
        )}

        <button
          onClick={roundDecimals}
          className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 font-thin py-2 px-4 rounded"
          aria-label="丸める"
        >
          丸める
        </button>

        <textarea
          value={result}
          readOnly
          className="w-full md:w-3/4 h-96 p-2 border border-gray-300 rounded-md resize-none text-lg"
          style={{ whiteSpace: "pre-wrap" }}
        />

        <button
          className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 font-thin py-2 px-4 rounded"
          onClick={() => copyTextToClipboard(result)}
          aria-label="結果をコピー"
        >
          コピー
        </button>
      </div>
    </div>
  );
};

export default RoundDecimal;
