import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Encrypter from './Encrypter';
import Header from './Header';
import { Button, Col, Container, Navbar, Nav, Row, InputGroup, FormControl, Checkbox } from "react-bootstrap";
import Converter from "./Converter";
export default function Home(props) {

    const [charList, setCharList] = useState(["*", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
    const [chartActivated, setChartActivated] = useState(false)
    const [counter, setCounter] = useState(0)
    function changeList(list) {
        setCharList(list)
        console.log(list)
    }
    const [characters, setCharacters] = useState("")
    const [about, setAbout] = useState(false)
    const [charArray, setCharArray] = useState([])
    const [warning, setWarning] = useState(false)
    const [listToUse, setListToUse] = useState(["*", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
    const [printMode, setPrintMode] = useState(false)
    const [showNum, setShowNum] = useState(true)
    function changeText(string) {
        let trueString = string.toUpperCase()
        let textInput = document.getElementById("text-input")
        if ((characters.indexOf(trueString[trueString.length - 1]) !== -1) && (trueString.length > characters.length)) {
            console.log(textInput)
            textInput.value = characters

        } else {
            textInput.value = trueString
            setCharacters(trueString)
        }
    }
    function updatedList() {
        return (charList)
    }
    function updateCharacterList(list) {
        setListToUse(list)
    }
    useEffect(() => {
        setCharArray(characters.split(""))
    }, [characters])
    function printModeChange(checked) {
        if (checked) {
            setPrintMode(true)
        } else {
            setPrintMode(false)
        }
        console.log(checked)
    }

    return (

        <>{!printMode && <div id="heading">
            <h3 id="intro">Ciphercom 1</h3>
            {/* <div>The Essential One-Time-Pad Toolkit</div> */}
            <h4 id="about" onClick={() => {
                setAbout(true)
            }}>Info</h4>

        </div>}
        
            {!about && <>
                {/* <span>Print Mode</span><input type="checkbox"/> */}
                {!printMode && <InputGroup size="lg">
                    <InputGroup.Text>Input Characters</InputGroup.Text>
                    <FormControl placeholder="Entering less than two characters will generate the default keys
                for the One-Time-Pad consisting of *ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789" id="text-input" as="textarea" aria-label="With textarea" aria-describedby="inputGroup-sizing-sm" onChange={e => {
                            changeText(e.target.value)
                            setChartActivated(false)
                        }} />
                </InputGroup>}
                {!printMode && <div className="buttons">
                    <Button variant="outline-primary" onClick={() => {
                        if (charArray.length > 1) {
                            changeList(charArray)
                            setCounter(counter + 1)
                        } else {
                            changeList(["*", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
                        }

                    }}>Use Characters</Button>
                    {!showNum && <Button variant="outline-success" onClick={() => {
                        setShowNum(true)

                    }}>Show Characters In Use</Button>}
                    {showNum && <Button variant="outline-warning" onClick={() => {
                        setShowNum(false)

                    }}>Hide Characters In Use</Button>}

                </div>}
                {!printMode && showNum && <h3>Characters In Use:</h3>}
                {!printMode && showNum && <div id="char-numbers">
                    {charList.map(character => {
                        return (
                            <>
                                <div className="char-number">
                                    <span>{charList.indexOf(character) + 1}</span>:<span>{character}</span>
                                </div>

                            </>
                        )
                    })}
                </div>}
                <Encrypter updatedList={updatedList} printMode={printMode} printModeChange={printModeChange} updateCharacterList={updateCharacterList} setCharList={setCharList} characters={charList} counter={counter} />
                <Converter updatedList={updatedList} printMode={printMode} characters={charList} counter={counter} />

            </>}
            {about &&
                <div id="about-info">
                    <div id="about-header">
                        <Button variant="outline-success"
                        onClick={()=>{
                            setAbout(false)
                        }}

                        >←Back</Button>
                        <h3>Info:</h3>
                        <div />
                    </div>
                    <p>Welcome to Ciphercom 1. This site is designed to optimize your use of
                        One-Time-Pads, the most powerful and simplistic way of sending encrypted
                        messages.
                    </p>
                    <p>Everything on this site is optional including the character input.
                        There is a default list of characters that we have provided for you in case you do not have
                        one of your own. If you do decide to input a list of characters, make sure that you and
                        the recipient have the characters listed in the exact same order. IE: The default list
                        has "*"" as the first character, "1" as the second and "2" as the third. If this is your order, the recipient
                        must not have: "1" as their first character, "2" as their second, and "*"" somewhere else. Your orders
                        must be exactly the same. "Characters In Use" will be a helpful aide in making sure that you have
                        proper order of characters.
                    </p>
                    <p>"Generate One-Time-Pad" will use the list of characters that you inputted or the default
                        character list and will randomly generate a One-Time-Pad for use. There is a checkbox which will hide
                        everything else on the page for you to print the OTP that is generated. Be sure to use the generated OTP
                        only once for you and the recipient and then generate a new pad afterwards. It's called "One-Time-Pad" for
                        a reason.
                    </p>
                    <p>The Character Reference Table is a great way to see how a cipher character is generated and how it is decrypted
                        by the sender and the recipient. It will make a table based on the character list that you submitted or the default
                        list. Consider the x axis and the y axis to be the Initial Character that you want to write and the
                        Pad Key Character(Either of them can be the x or y axis). The point where the lines of the two axes intersect is the
                        cipher character you will use to encrypt your original character. If you are the recipient and would like to use the
                        chart, you have the Pad Key Character and the Cipher Character. From any axis, find the Pad Key Character,
                        move along the line until you find the Cipher Character. From there, head towards the adjacent direction of your pad key
                        path and you will find the Initial Character.<br /> If this is difficult to understand, simply click on a character on the table
                        and you will find information about it.
                    </p>
                    <p>The Cipher Finder and Origin Finder are tools that will take the characters that you inputted
                        and will use your character list or the default list to figure out what the Cipher Character or Initial Character is.
                        They will give you the answers and will explain to you the math for how they have figured out the answers.
                        This can be helpful if you do not have a table available to you and want to encrypt or decrypt messages with math.
                        <br />
                        Thank you for reading and I hope you enjoy using Ciphercom 1!
                    </p>
                </div>}
        </>
    )
}