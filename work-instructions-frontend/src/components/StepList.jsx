import StepCard from "./StepCard";
import "./styles.css"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const StepList = ({ workInstruction }) => {

  return (
    <div className="stepList">
      <h5 className="heading">Title: <b>Step List</b></h5>
      <div className="stepDisplayBox">
      <div className = "buttonStyle">
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<ExpandMoreIcon/>}
              >
                <Typography>{"Hi cutie"}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        {/* {workInstruction.map((item, index) => {
          return  <div className = "buttonStyle">
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<ExpandMoreIcon/>}
              >
                <Typography>{item.text}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        })} */}
      </div>
      <StepCard workInstruction={workInstruction} />
    </div>
  );

};

export default StepList;

{/*<Button className='button' variant="contained">{item.text}</Button> */}