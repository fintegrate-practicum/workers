import {  useNavigate } from "react-router-dom";
// import Tami from './Tami'
const WelcomeMessage = () => {
  const navigate = useNavigate();
    const handleClick = () => (event: React.SyntheticEvent) => {
      alert ("from click");
      // <Link to="/Tami">Please login again</Link>
      navigate("/Tami");
    };
return (
<>
<div className="Welcome">
<h1 className='red'>Welcome to Our Worker Showcase</h1>
<p>
ברוכים הבאים לאתר החדש שלנו!
אנחנו נרגשים להציג בפניכם את הפלטפורמה המתקדמת שלנו, שתוכננה במיוחד כדי לספק לכם חווית משתמש מושלמת, שירותים מתקדמים ומידע עדכני. באתר תוכלו למצוא מגוון רחב של מוצרים, שירותים, תכנים ומבצעים בלעדיים.
העיצוב החדשני והקל לשימוש יאפשר לכם לנווט בקלות ולמצוא בדיוק את מה שאתם מחפשים, בין אם אתם לקוחות ותיקים ובין אם אתם מצטרפים חדשים.
תודה שבחרתם להיות חלק מהמשפחה שלנו. אנו מזמינים אתכם לחקור, ליהנות ולהתרשם מהתכנים והאפשרויות המגוונות שהאתר שלנו מציע.
צוות האתר כאן עבורכם לכל שאלה או צורך. גלישה נעימה!
  </p>
  <button onClick={handleClick()}>לעריכה</button>
  </div>
{/* <button></button> */}
</>
);}
export default WelcomeMessage