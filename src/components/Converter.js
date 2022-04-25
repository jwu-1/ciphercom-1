import React, { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton, Col, InputGroup, FormControl, Container, Navbar, Nav, Row } from "react-bootstrap";
export default function Converter(props) {
    const [char, setChars] = useState(props.characters)
    const [initLet, setInitLet] = useState("")
    const [initAns, setInitAns] = useState("")
    const [initDesc, setInitDesc] = useState("")
    const [padKey1, setPadKey1] = useState("")
    const [padKey2, setPadKey2] = useState("")
    const [ciphInp, setCiphInp] = useState("")
    const [ciphDesc, setCiphDesc] = useState("")
    const [ciphAns, setCiphAns] = useState("")
    function test(list) {
        console.log(list[list.length - 1])
    }
    useEffect(() => {
        if (document.getElementById("initial-text")) {
            let textInputI = document.getElementById("initial-text")
            let textInputP1 = document.getElementById("pad-key1")
            let textInputP2 = document.getElementById("pad-key2")
            let ciphInput = document.getElementById("cipher-text")
            textInputI.value = ""
            textInputP1.value = ""
            textInputP2.value = ""
            ciphInput.value = ""
            setInitLet("")
            setPadKey1("")
            setCiphInp("")
            setPadKey2("")
            setCiphAns("")
            setInitAns("")
            setCiphDesc("")
            setInitDesc("")
        }
    }, [props.updatedList])
    function initChange(letter) {
        let textInput = document.getElementById("initial-text")
        let trueLetter = letter.toUpperCase()
        let charList = props.characters
        if (charList.indexOf(trueLetter) !== -1 || letter.length === 0) {
            setInitLet(trueLetter)
            textInput.value = trueLetter
        } else {
            textInput.value = initLet
        }
    }
    function cipherChange(letter) {
        let textInput = document.getElementById("cipher-text")
        let trueLetter = letter.toUpperCase()
        let charList = props.characters
        if (charList.indexOf(trueLetter) !== -1 || letter.length === 0) {
            console.log(trueLetter)
            setCiphInp(trueLetter)
            textInput.value = trueLetter
        } else {
            textInput.value = ciphInp
        }
    }
    function padKeyChangeOne(letter) {
        let textInput = document.getElementById("pad-key1")
        let trueLetter = letter.toUpperCase()
        let charList = props.characters
        if (charList.indexOf(trueLetter) !== -1 || letter.length === 0) {
            console.log(charList.indexOf(trueLetter))
            setPadKey1(trueLetter)
            textInput.value = trueLetter
        } else {
            textInput.value = padKey1
        }
    }
    function padKeyChangeTwo(letter) {
        let textInput = document.getElementById("pad-key2")
        let trueLetter = letter.toUpperCase()
        let charList = props.characters
        if (charList.indexOf(trueLetter) !== -1 || letter.length === 0) {
            console.log(trueLetter)
            setPadKey2(trueLetter)
            textInput.value = trueLetter
        } else {
            textInput.value = padKey2
        }
    }
    function findCipher() {
        let directory = props.characters
        let length = directory.length
        let cipherSum = directory.indexOf(initLet) + directory.indexOf(padKey1)
        console.log(cipherSum, length)
        if (cipherSum >= length) {
            let infoNum = length
            let infoNum2 = 0
            console.log(cipherSum)
            console.log("FUCKIN SD")
            if (cipherSum >= length) {
                cipherSum = cipherSum - length
                infoNum = cipherSum
                infoNum2 = infoNum

                console.log("SD GUNDAM")

            }
            console.log(cipherSum)
            setCiphDesc(`${initLet} is character ${directory.indexOf(initLet)}
             in your list of keys. ${padKey1} is character ${directory.indexOf(padKey1)}.
             They add up to ${directory.indexOf(initLet) + directory.indexOf(padKey1)} which larger
             than the last character number. Because of this we will subtract ${directory.indexOf(initLet) + directory.indexOf(padKey1)} 
             by the total number of characters, ${length}, which equates to ${infoNum2}.  Character ${infoNum}
             is ${directory[cipherSum]} in your list and that will be the Cipher character you would use. 
              `)
            setCiphAns(directory[cipherSum])
        } else if (!initLet || !padKey1) {
            setCiphDesc(`You need to enter a character for both the originating character and pad key. `)
        } else {
            setCiphDesc(`${initLet} is character ${directory.indexOf(initLet)}
            in your list of keys. ${padKey1} is character ${directory.indexOf(padKey1)}.
            They add up to ${directory.indexOf(initLet) + directory.indexOf(padKey1)}. The result will be  ${directory.indexOf(initLet) + directory.indexOf(padKey1)}.
            That is the character number for ${directory[cipherSum]}. `)
            setCiphAns(directory[cipherSum])
        }
        setCiphAns(directory[cipherSum])
        console.log(directory)
    }
    function findInitial() {
        let directory = props.characters
        let length = directory.length
        let cipherNum = directory.indexOf(ciphInp)
        let padNum = directory.indexOf(padKey2)
        let initSum = (directory.indexOf(ciphInp) - directory.indexOf(padKey2))
        if (!ciphInp || !padKey2) {
            setInitDesc(`You need to enter a character for both the cipher character and pad key.`)
            console.log(ciphInp, padKey2)
        } else if (initSum < 0) {
            initSum += length
            setInitDesc(`The Cipher Character, ${ciphInp} is Character #${cipherNum}, it should be
            subtracted by the index of Pad Key Character ${padKey2} which is #${padNum}.
            The result is ${directory.indexOf(ciphInp) - directory.indexOf(padKey2)}.
            To make this a positive number, this number will add with the total number
            of characters available which is ${length}. The result is ${initSum} which 
            is the character number for ${directory[initSum]}.
            `)
        } else {
            setInitDesc(`The Cipher Character, ${ciphInp} is Character #${cipherNum}, it should be
            subtracted by the index of Pad Key Character ${padKey2} which is #${padNum}.
            The result is ${initSum} which 
            is the character number for ${directory[initSum]}.
            `)

        }

        setInitAns(directory[initSum])
        if (!ciphInp || !padKey2) {
            setInitAns()
        }

    }
    return (
        <>
            <br />
            {!props.printMode && <h3>Cipher Finder</h3>}
            {!props.printMode && <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Initial Character</InputGroup.Text>
                <FormControl
                    id="initial-text"
                    placeholder="Initial Character"
                    aria-label="Initial Text"
                    aria-describedby="basic-addon2"
                    onChange={e => {
                        initChange(e.target.value)
                    }}
                />
                <InputGroup.Text id="basic-addon2">Pad Key</InputGroup.Text>
                <FormControl
                    id="pad-key1"
                    placeholder="Pad Key"
                    aria-label="Pad Key"
                    aria-describedby="basic-addon2"
                    onChange={e => {
                        padKeyChangeOne(e.target.value)
                    }}
                />
            </InputGroup>}

            {!props.printMode && <Button variant="outline-info" onClick={() => {
                findCipher()
            }}>Find Cipher Character</Button>}
            <br />

            {!props.printMode && <div className="answer-info">
                <div className="character-answer">{ciphAns}</div>
                {ciphDesc}

            </div>}
            {!props.printMode && <h3>Origin Finder</h3>}
            {!props.printMode && <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Cipher Character</InputGroup.Text>
                <FormControl
                    id="cipher-text"
                    placeholder="Cipher Character"
                    aria-label="Initial Text"
                    aria-describedby="basic-addon2"
                    onChange={e => {
                        cipherChange(e.target.value)
                    }}
                />
                <InputGroup.Text id="basic-addon2">Pad Key</InputGroup.Text>
                <FormControl
                    id="pad-key2"
                    placeholder="Pad Key"
                    aria-label="Pad Key"
                    aria-describedby="basic-addon2"
                    onChange={e => {
                        padKeyChangeTwo(e.target.value)
                    }}
                />
            </InputGroup>}
            {!props.printMode && <Button variant="outline-info" onClick={() => {
                findInitial()
            }}>Find Original Character</Button>}
            {!props.printMode && <div className="answer-info">
                <div className="character-answer">{initAns}</div>
                {initDesc}

            </div>}
        </>
    )
}