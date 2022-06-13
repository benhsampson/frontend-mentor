import {createStitches} from "@stitches/react"
import type {Reducer} from "react"
import {useCallback, useReducer} from "react"

const {styled} = createStitches({
  media: {
    sm: "(min-width: 375px)",
    lg: "(min-width: 1440px)",
  },
  theme: {
    colors: {
      orange: "hsl(25, 97%, 53%)",
      white: "hsl(0, 0%, 100%)",
      lightGrey: "hsl(217, 12%, 63%)",
      mediumGrey: "hsl(216, 12%, 54%)",
      darkBlue: "hsl(213, 19%, 18%)",
      veryDarkBlue: "hsl(216, 12%, 8%)",
    },
    typography: {
      paragraph: "15px",
    },
    fonts: {
      main: "Overpass, apple-system, sans-serif",
    },
    fontWeights: {
      normal: 400,
      bold: 700,
    },
  },
})

const Main = styled("main", {
  backgroundColor: "$veryDarkBlue",
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
})

const Container = styled("div", {
  padding: "0 1rem",
  margin: "0 auto",
})

const ReviewCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  borderRadius: "2rem",
  backgroundColor: "$darkBlue",
  maxWidth: "26rem",
  width: "100%",
  minHeight: "1rem",
  padding: "2rem",
})

const ReviewCardGridContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  rowGap: "1.5rem",
})

const ReviewCardGridItem = styled("div", {
  variants: {
    orientation: {
      left: {
        justifySelf: "start",
      },
      center: {
        justifySelf: "center",
      },
    },
  },
})

const Circle = styled("div", {
  width: "3rem",
  height: "3rem",
  borderRadius: "50%",
  overflow: "hidden",
  backgroundColor: "hsla(0, 100%, 100%, 0.05)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const StarWrapper = styled(Circle, {
  "& img": {
    display: "inline-block",
    verticalAlign: "middle",
    width: "1.25rem",
    height: "1.25rem",
  },
})

const Heading = styled("h1", {
  fontFamily: "$main",
  fontSize: "2.5em",
  fontWeight: "$bold",
  color: "$white",

  variants: {
    align: {
      center: {
        textAlign: "center",
      },
    },
  },
})

const Content = styled("p", {
  fontFamily: "$main",
  fontSize: "1em",
  fontWeight: "$normal",
  lineHeight: "1.4",
  color: "$lightGrey",
  marginTop: "1rem",

  variants: {
    align: {
      center: {
        textAlign: "center",
      },
    },
  },
})

const RatingButtonGroup = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "space-between",
})

const RatingButton = styled("button", Circle, {
  cursor: "pointer",
  fontFamily: "$main",
  fontSize: "1.125em",
  fontWeight: "$bold",

  variants: {
    active: {
      true: {
        color: "$white",
        backgroundColor: "$orange",
      },
      false: {
        color: "$lightGrey",

        "&:hover": {
          backgroundColor: "hsla(0, 100%, 100%, 0.15)",
        },
      },
    },
  },
})

const Button = styled("button", {
  width: "100%",
  cursor: "pointer",
  backgroundColor: "$orange",
  color: "$white",
  fontFamily: "$main",
  overflow: "hidden",
  fontSize: "1em",
  lineHeight: "2.5",
  height: "2.5rem",
  borderRadius: "1.25rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
})

const ImageWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
})

const Pill = styled("div", {
  backgroundColor: "hsl(0, 100%, 100%, 0.05)",
  color: "$orange",
  fontSize: "1rem",
  lineHeight: "2rem",
  borderRadius: "1rem",
  overflow: "hidden",
  padding: "0 1rem",
})

const RATING_OUT_OF = 5

export default function Challenge1() {
  const [state, dispatch] = useReducer<
    Reducer<
      {rating?: number; done?: boolean},
      {type: "rate" | "submit"; rating?: number}
    >
  >(
    (state, action) => {
      switch (action.type) {
        case "rate":
          return {rating: action.rating}
        case "submit":
          return {...state, done: true}
        default:
          return state
      }
    },
    {done: false},
  )

  const handleSubmit = useCallback(() => {
    if (state.rating) dispatch({type: "submit"})
  }, [state.rating])

  return (
    <Main>
      <Container>
        <ReviewCard>
          {!state.done ? (
            <ReviewCardGridContainer>
              <ReviewCardGridItem orientation="left">
                <StarWrapper>
                  <img
                    src="/challenge-files/1/images/icon-star.svg"
                    alt="Star"
                  />
                </StarWrapper>
              </ReviewCardGridItem>
              <ReviewCardGridItem orientation="left">
                <Heading>How did we do?</Heading>
                <Content>
                  Please let us know how we did with your support request. All
                  feedback is appreciated to help us improve our offering!
                </Content>
              </ReviewCardGridItem>
              <ReviewCardGridItem>
                <RatingButtonGroup>
                  {Array.from({length: RATING_OUT_OF}).map((_, i) => {
                    const thisRating = i + 1
                    return (
                      <RatingButton
                        key={`RatingButton${i}`}
                        onClick={() =>
                          dispatch({type: "rate", rating: thisRating})
                        }
                        active={state.rating === thisRating}
                      >
                        {thisRating}
                      </RatingButton>
                    )
                  })}
                </RatingButtonGroup>
              </ReviewCardGridItem>
              <ReviewCardGridItem>
                <Button onClick={handleSubmit}>Submit</Button>
              </ReviewCardGridItem>
            </ReviewCardGridContainer>
          ) : (
            <ReviewCardGridContainer>
              <ReviewCardGridItem orientation="center">
                <ImageWrapper>
                  <img
                    src="/challenge-files/1/images/illustration-thank-you.svg"
                    alt="Thank you"
                  />
                </ImageWrapper>
              </ReviewCardGridItem>
              <ReviewCardGridItem orientation="center">
                <Pill>
                  You selected {state.rating} out of {RATING_OUT_OF}
                </Pill>
              </ReviewCardGridItem>
              <ReviewCardGridItem orientation="center">
                <Heading align="center">Thank you!</Heading>
                <Content align="center">
                  We appreciate you taking the time to give a rating. If you
                  ever need more support, don’t hesitate to get in touch!
                </Content>
              </ReviewCardGridItem>
            </ReviewCardGridContainer>
          )}
        </ReviewCard>
      </Container>
    </Main>
  )
}
