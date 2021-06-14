import React, {PureComponent} from "react";
import 'jspdf-autotable'
import jsPDF from 'jspdf'
import logo from './prefectos-logo.png'
import faker from "faker"

// Courier: (4) ["", "Bold", "Oblique", "BoldOblique"]
// Helvetica: (4) ["", "Bold", "Oblique", "BoldOblique"]
// Symbol: [""]
// Times: (4) ["Roman", "Bold", "Italic", "BoldItalic"]
// ZapfDingbats: [""]
// courier: (4) ["normal", "bold", "italic", "bolditalic"]
// helvetica: (4) ["normal", "bold", "italic", "bolditalic"]
// symbol: ["normal"]
// times: (4) ["normal", "bold", "italic", "bolditalic"]
// zapfdingbats: ["normal"]

export default class pdfGenerator extends PureComponent {
    constructor(props) { 
      super(props)

      this.state = {

      }
    }   

    renderHeader(doc) {
      // Rendering the header
      doc.saveGraphicsState();
      doc.setFillColor('#737272')
      doc.rect(0, 0, 450, 40, "F");
      doc.addImage(logo, "PNG", 140, 5, 150, 30);
      doc.restoreGraphicsState();
      return 40 // This returns the final Y after which further contents can be printed
    }

    renderFooter(doc, pgNo, pgTotal) {
      // Rendering the header
      doc.saveGraphicsState();
      doc.setFillColor('#737272');
      doc.rect(0, 600, 450, 35, "F");
      doc.setTextColor('#f7f7f5')
      doc.setFontSize(10)
      doc.setFont("helvetica", "bolditalic")
      doc.text("Prefectos Private Ltd", 5, 618)
      doc.setFont("courier", "bold")
      doc.text(`Page ${pgNo} of ${pgTotal}`, 380, 618)
      doc.restoreGraphicsState();
    }

    headRows() {
      return [
        { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
      ]
    }
    
    footRows() {
      return [
        { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
      ]
    }
    
    columns() {
      return [
        { header: 'ID', dataKey: 'id' },
        { header: 'Name', dataKey: 'name' },
        { header: 'Email', dataKey: 'email' },
        { header: 'City', dataKey: 'city' },
        { header: 'Exp', dataKey: 'expenses' },
      ]
    }
    
    data(rowCount) {
      rowCount = rowCount || 10
      var body = []
      for (var j = 1; j <= rowCount; j++) {
        body.push({
          id: j,
          name: faker.name.findName(),
          email: faker.internet.email(),
          city: faker.address.city(),
          expenses: faker.finance.amount(),
        })
      }
      return body
    }
    
    bodyRows(rowCount) {
      rowCount = rowCount || 10
      var body = []
      for (var j = 1; j <= rowCount; j++) {
        body.push({
          id: j,
          name: faker.name.findName(),
          email: faker.internet.email(),
          city: faker.address.city(),
          expenses: faker.finance.amount(),
        })
      }
      return body
    }


    jsPDFGenerator = () => {
      var doc = new jsPDF('p', 'px');
      let finalY = 0
      finalY = this.renderHeader(doc)

      finalY += 50
      doc.saveGraphicsState()
      doc.setFontSize(20)
      doc.text('Sales By Venue', 160, finalY)

      finalY += 20
      doc.autoTable({
        startY: finalY,
        head: this.headRows(),
        body: this.bodyRows(10),
      })

      finalY += 200

      finalY += 30
      doc.text('Sales By Dispatch Type', 130, finalY)
      finalY += 20
      doc.autoTable({
        startY: finalY,
        head: this.headRows(),
        body: this.bodyRows(10),
      })
      doc.restoreGraphicsState()

      this.renderFooter(doc, 1, 2)

      doc.addPage()

      finalY = this.renderHeader(doc)

      finalY += 30
      doc.saveGraphicsState()
      doc.setFontSize(20)
      doc.text('Some Random Content', 14, finalY)
      doc.setFontSize(11)
      doc.setTextColor(100)
      finalY += 15

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize
      var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
      var text = doc.splitTextToSize(faker.lorem.sentence(45), pageWidth - 35, {})
      doc.text(text, 14, finalY)
      finalY += 45
    
      doc.autoTable({
        showHead: 'firstPage',
        startY: finalY,
        head: this.headRows(),
        body: this.bodyRows(20),
      })
    
      doc.text(text, 14, doc.lastAutoTable.finalY + 25)    
      doc.restoreGraphicsState()

      this.renderFooter(doc, 2, 2)

      doc.save("generated.pdf")
    }
    
    render () {
      return (<button onClick={this.jsPDFGenerator}>Generate Pdf</button>);
    }
}


























// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
