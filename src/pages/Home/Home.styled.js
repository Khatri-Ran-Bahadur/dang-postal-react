import styled from "styled-components";

export const HomeStyled = styled.div `
  .carousel-wrapper {
  }
  .services {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    /* width: 100%; */

    padding: 20px;
    padding-bottom: 0;
    .service-card {
      height: 100%;
      /* width: 100%; */
      margin: 6px;
      .card-img-service {
        height: 140px;
        width: 100%;
        display: block;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .director-card {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: none !important;
    }

    .director-img {
      width: 200px;
      height: 200px;
      height: 200px;
      display: flex;

      margin-bottom: 1em;
      margin-top: 1em;
    }

    .director-desc {
      text-align: center;
    }
    .news {
      padding: 10px;
      .card {
        border: none !important;
      }
    }
  }
  .readmore {
    padding: 0.75rem 1.25rem;
  }

  .home-last-section {
    width: 100%;
    background: #393e64;
    padding: 50px 0;
    margin-right: 0;
    margin-left: 0;
    .card {
      margin-left: 10px;
      margin-right: 10px;
      
    }

    .empty {
      border: none !important;
      background: #393e64;
    }
  }
  .e-attendance {
    width: 100%;
    background: #393e64;
    padding: 50px 0;
    color: white;
    padding: 2em;
    padding-left: 10px;
    padding-right: 11px;
    margin-right: 0;
    margin-left: 0;
    .content {
      border: 2px solid white;
      border-radius: 11px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      cursor: pointer;
      padding: 0.3em;
      &:active {
        color: #00ddc2;
      }
      &:hover {
        color: #ff9478;
      }
      span {
        margin-left: 6px;
        margin-right: 6px;
      }
    }
  }
  .card-img-top {
    height: 200px;
  }
.card {
  margin: auto;
  text-align: center;
  font-family: arial;
 
}



.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 6px;
  color: white;
  background-color: #3e65a0;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
.news-excerpt{
  font-size:16px;
}
.card-text p{
  font-size:15px;
}
`;