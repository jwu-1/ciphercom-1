import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
export default function Encrypter(props) {
    const defaultArray = ["*", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const [thirtySix, setThirtySix] = useState(props.characters)
    // const [counter, setCounter] = useState(props.counter)
    const [list, setList] = useState([])
    const [charTable, setCharTable] = useState([])
    const [toggle, setToggle] = useState(true)
    const [used, setUsed] = useState(false)
    const [toggleTable, setToggleTable] = useState(false)
    const [blanks, setBlanks] = useState([])
    const [toggleBlanks, setToggleBlanks] = useState(false)
    const [blankActivated, setBlankActivated] = useState(false)
    const [tableInfo, setTableinfo] = useState("Click on any of the characters to see information about them.")
    useEffect(() => {
        if (props.updatedList().length > 1) {
            setThirtySix(props.updatedList())
        } else {
            setThirtySix(defaultArray)
        }
    })
    useEffect(blankPages
        , [])
    useEffect(() => {
        tableMaker()
        let highlighted = document.querySelectorAll(".square-highlight")
        highlighted.forEach(square => {

            square.className = "square"
        })
    }, [thirtySix])
    function blankPages() {
        const generated = []
        let count = 1;
        while (count < 190) {
            generated.push("")
            count++
        }
        setBlanks(generated)

    }
    function scramble() {
        const generated = []
        let count = 1;
        while (count < 190) {
            generated.push(thirtySix[Math.floor(Math.random() * thirtySix.length)])
            count++
        }
        setList(generated)
        setUsed(true)
        props.updateCharacterList(thirtySix)
    }
    function tableMaker() {
        let table = []
        let firstRow = []
        let completed = false
        const row = props.characters
        const column = props.characters
        for (let j = 0; !completed; j++) {
            let rowArray = []
            if (j === column.length) {
                j = 0
                completed = true
            }
            let finishedRow = false
            let done = false
            let k = 0;
            for (let i = j; !done; i++) {
                if (i === row.length) {
                    i = 0
                    finishedRow = true
                }
                if (j === 0 && !completed) {
                    rowArray.push(
                        {
                            cipher: row[i],
                            row: column[j],
                            column: row[i]
                        }
                    )
                    firstRow.push(row[i])
                } else {
                    rowArray.push(
                        {
                            cipher: row[i],
                            row: column[j],
                            column: firstRow[k]
                        }
                    )
                    k++
                }
                if (finishedRow === true && row[i] === column[j]) {
                    done = true
                }


            }
            table.push(rowArray)
        }


        setCharTable(table)

    }

    return (
        <div id="home">
            {!props.printMode && <div id="encrypter-buttons">
                <Button variant="outline-primary" onClick={() => {
                    scramble()
                }}>Generate One-Time-Pad</Button>
                {used && toggle && <Button variant="outline-warning" onClick={() => {
                    setToggle(false)
                }}>Hide Generated One-Time-Pad</Button>}
                {!toggle && <Button variant="outline-success" onClick={() => {
                    setToggle(true)
                }}>Show Generated One-Time-Pad</Button>}
                {!toggleBlanks && <Button variant="outline-success" onClick={() => {
                    setToggleBlanks(true)
                }}>Show Blank One-Time-Pad</Button>}
                {toggleBlanks && <Button variant="outline-warning" onClick={() => {
                    setToggleBlanks(false)
                }}>Hide Blank One-Time-Pad</Button>}
            </div>}
            {used && toggle && !props.printTableMode && <Form id="print-chart">

                <Form.Check
                    className="no-print"
                    type="checkbox"
                    label={`Print Mode(Chart)`}
                    onChange={(e) => {
                        props.printModeChange(e.target.checked)
                    }} />


            </Form>}
            {toggleBlanks && (!toggle || !used) && !props.printTableMode && <Form id="print-chart">

                <Form.Check
                    className="no-print"
                    type="checkbox"
                    label={`Print Mode(Chart)`}
                    onChange={(e) => {
                        props.printModeChange(e.target.checked)

                    }} />


            </Form>}
            {toggle && !props.printTableMode && <div id="list">
                {list.map(character => {
                    return (<div className="overall">
                        <div type="text" className="character" defaultValue={character}>{character}</div>
                        <input type="text" className="box"></input>
                        <input type="text" className="box"></input>
                    </div>)
                })}
            </div>}
            {toggleBlanks && !props.printTableMode && <div id="list">
                {blanks.map(page => {
                    return (<div className="overall">
                        <input type="text" className="box"></input>
                        <input type="text" className="box"></input>
                        <input type="text" className="box"></input>
                    </div>)
                })}
            </div>}
            <br />
            {!props.printMode && !toggleTable && <Button variant="outline-success"
                onClick={() => {
                    tableMaker()
                    setToggleTable(true)
                }}
            >
                Show Character Reference Table
            </Button>}
            {!props.printMode && toggleTable && <Button variant="outline-warning"
                onClick={() => {
                    tableMaker()
                    setToggleTable(false)
                }}
            >
                Hide Character Reference Table
            </Button>}

            {!props.printMode && toggleTable && <div>{tableInfo}</div>}
            {toggleTable && (!props.printMode || props.printMode && props.printTableMode) && <Form id="print-chart">

                <Form.Check
                    className="no-print"
                    type="checkbox"
                    label={`Print Mode(Table)`}
                    onChange={(e) => {
                        props.printTable(e.target.checked)
                        let highlighted = document.querySelectorAll(".square-highlight")
                        highlighted.forEach(square => {

                            square.className = "square"
                        })
                    }} />


            </Form>}
            {(!props.printMode || props.printMode && props.printTableMode) && toggleTable && <div id="table">
                {charTable.map(array => {
                    return (<div>{array.map
                        (
                            character => {
                                return (<div className="overall-table"><div className="character-table"
                                    onClick={() => {
                                        if (!props.printTableMode) {
                                            setTableinfo(<div className="direction">
                                                <div className="answer-box">

                                                    <div className="table-answer">Original Character: "{character.row}"</div>
                                                    <div className="table-answer">Pad Key Character: "{character.column}"</div>
                                                    <div className="table-answer">Cipher Character: "{character.cipher}"</div>
                                                </div>
                                                <div>or</div>
                                                <div className="answer-box">
                                                    <div className="table-answer">Original Character: "{character.column}"</div>
                                                    <div className="table-answer">Pad Key Character: "{character.row}"</div>
                                                    <div className="table-answer">Cipher Character: "{character.cipher}"</div>
                                                </div>
                                            </div>
                                            )
                                            let highlighted = document.querySelectorAll(".square-highlight")
                                            highlighted.forEach(square => {

                                                square.className = "square"
                                            })
                                            let allSquares = document.querySelectorAll(".square")
                                            let allSquaresArray = Array.from(allSquares)
                                            let columnSquares = allSquaresArray.filter(square => {
                                                return square.id.includes(`column-${character.column}`)
                                            })
                                            let rowSquares = allSquaresArray.filter(square => {
                                                return square.id.includes(`row-${character.row}`)
                                            })

                                            columnSquares.forEach(square => {
                                                square.className = "square-highlight"
                                            })
                                            rowSquares.forEach(square => {
                                                square.className = "square-highlight"
                                            })
                                        }
                                    }}
                                ><div className="square" id={`row-${character.row} column-${character.column}`}>{character.cipher}</div></div>
                                </div>)
                            }
                        )

                    }</div>)
                })}
            </div>}
        </div>

    )
}