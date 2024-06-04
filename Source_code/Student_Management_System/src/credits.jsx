import React from "react";
import NavBar from "./NavBar.jsx";
import { useState } from "react";


function HoverBox({ content }) {
    const [hovered, setHovered] = useState(false);
  
    return (
      <div 
        className="creditName"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered ? <div>{content.hover}</div> : <div>{content.normal}</div>}
      </div>
    );
  }


function Credit() {
    const boxContents = [
        { normal: 'Ngô Thành Trung', hover: '22521560' },
        { normal: 'Vũ Anh Tuấn', hover: '22521614' },
        { normal: 'Nguyễn Thành Vinh', hover: '22521676' },
        { normal: 'Trần Võ Lâm Trường', hover: '22521586' },
        { normal: 'Ngô Nguyễn Nam Trung', hover: '22521559' }
      ];
    
    return (
    <>
        <NavBar/>
        <div className='function_title'>
                    <p>CREDIT</p>
        </div>
        <div className="credit">
            {/* <div className="creditName" onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}>
                                        {hovered ? <div>22521560</div> : <div>Ngô Thành Trung</div>}
            </div>

            <div className="creditName" onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}>
                                        {hovered ? <div>22521614</div> : <div>Vũ Anh Tuấn</div>}
            </div>
            <div className="creditName" onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}>
                                        {hovered ? <div>22521676</div> : <div>Nguyễn Thành Vinh</div>}
            </div>
            <div className="creditName" onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}>
                                        {hovered ? <div>22521586</div> : <div>Trần Võ Lâm Trường</div>}
            </div>
            <div className="creditName" onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}>
                                        {hovered ? <div>22521559</div> : <div>Ngô Nguyễn Nam Trung</div>} */}
            {boxContents.map((content, index) => (
        <HoverBox key={index} content={content} />
        ))}
        </div>


    </>
    )
}

export default Credit