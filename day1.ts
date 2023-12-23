import downloadFile from "./utils/download_file";
import './utils/general_utils';
import { splitLines } from "./utils/general_utils"

import * as dotenv from "dotenv";


dotenv.config();  // Load environment variables from .env file 

// Replace the URL with the actual URL of the file you want to download
const fileUrl = 'https://adventofcode.com/2023/day/1/input';
//TODO: add dotenv
const sessionCookie = process.env

function oneStar() {
  // Call the function
  downloadFile(fileUrl, sessionCookie)
    .then((file) => splitLines(file).filter(line => line.length > 0))
    .then((input) => {
      return input.map((line) => {
        const tmp = line.replace(/\D/g,'');
        return BigInt(tmp[0] + tmp[tmp.length - 1])
      }).filter((line) => typeof line === "bigint")
    })
    .then((numbers) => {
      console.log(numbers)
      numbers.reduce((sum: bigint, current) => {
        const res = sum + current
        console.log(res)
        return res
      }, BigInt(0))
    })
    .then((result) => {
      console.log(result)
    });
}

function twoStars() {
  const dictionary: {[index: string]:any} = {
    "zero": "0",
    "one": "1",
    "two": "2", 
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "1" : "1",
    "2" : "2",
    "3" : "3",
    "4" : "4",
    "5" : "5",
    "6" : "6",
    "7" : "7",
    "8" : "8",
    "9" : "9",
  }

  // Call the function
  downloadFile(fileUrl, sessionCookie)
    .then((file) => {
      let res = splitLines(file)
      return res.slice(0, res.length -1)
    })
    .then((input) => {
      return input.map((line) => {
        // keep a dict of number and offset
        const indexToOccurence = new Map<number, number>();
        
        for (let nr in dictionary) {
          let tmp = line
          let currIndex = -1

          while ((currIndex = tmp.indexOf(nr, currIndex + 1)) != -1) {
            indexToOccurence.set(currIndex, dictionary[nr])
          }
        }

        let resArr = Array.from(indexToOccurence).sort((a, b) => {
          return a[0] - b[0]
        })

        let res = 0n
        if (resArr.length == 1) {
          res = BigInt(String(resArr[0][1]))
        } else {
          res = BigInt(String(resArr[0][1]) + String(resArr[resArr.length - 1][1]))
        }

        console.log("res=" + res + "\t\t| line=" + line)
        return res
      })
    })
    .then((numbers) => {
      // console.log(numbers)
      return numbers.reduce((sum, current) => {
        // console.log("s: " + sum + "| curr: " + current)
        return sum + current
      }, BigInt(0))
    }) 
    .then((result) => {
      console.log(result)
    });
}

twoStars()