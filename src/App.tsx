import {useEffect, useState} from 'react'
import './App.css'
import Raphael from "raphael"
import jsPDF from "jspdf"
import html2canvas from 'html2canvas'

let svg

function App() {
  const [count, setCount] = useState(0)

  function getSVG() {
    const paper = new Raphael(0, 0, 500, 500)
    // const paper = new Raphael(document.getElementById('canvas_container'), 500, 500)

    // const circle = paper.circle(100, 100, 80)
    for (let i = 0; i < 5; ++i) {
      const k = i * 5
      paper.circle(250 + (2 * k), 100 + k, 50 - k)
    }
    const rectangle = paper.rect(200, 200, 250, 100)
    rectangle.attr({
      fill: '90-#526c7a-#64a0c1',
      stroke: '#3b4449', 'stroke-width': 10, 'stroke-linejoin': 'round',
      transform: 'r-90',
    })

    const ellipse = paper.ellipse(200, 400, 100, 50)
    const moodText = paper.text(200, 300, 'My\nPDF').attr({fill: '#fff', 'font-size': 24});

    const tetromino = paper.path("M 250 250 l 0 -50 l -50 0 l 0 -50 l -50 0 l 0 50 l -50 0 l 0 50 z")
    tetromino.attr({
      fill: '#9cf', 'fill-opacity': 0.5,
      stroke: '#ddd', 'stroke-width': 5,
    })

    /*/
    tetromino.animate(
      {
        transform: 'r360',
        'stroke-width': 1,
      }, 2000, 'bounce',
      function() {
        console.log('callback after original animation finishes')
        this.animate({
          transform: 'r-90',
          stroke: '#3b4449',
          'stroke-width': 10
        }, 1000);
      }
    )
    /*/

    // console.log(tetromino)
    // svg = paper.toSVG()
    svg = paper.canvas
  }

  useEffect(() => {
    getSVG()
  }, [])

  function savePDF() {
    //
    html2canvas(document.querySelector("#canvas_container"))
      .then(canvas => {
        // document.body.appendChild(canvas)
        //
        const imgData = canvas.toDataURL('image/png')

        const doc = new jsPDF()
        doc.text("Hello world!", 10, 10)
        doc.addImage(imgData, 'JPEG', 10, 20)
        doc.save(`doc${count}.pdf`)
        //
      })
    //
    // const doc = new jsPDF()
    // doc.text("Hello world!", 10, 10)
    // doc.save(`doc${count}.pdf`)
    //
  }

  return (
    <>
      <div
        id="canvas_container"
        style={{
          width: "500px",
          height: "50px",
          border: "1px solid #aaa",
        }}
      />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1)
          savePDF()
        }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
