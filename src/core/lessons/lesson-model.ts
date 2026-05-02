// A Lesson ties together what the Elder Fire teaches (parable, intuition)
// and what the Cinder teaches (formal theory + practice exercises). The
// player flows through stages: parable → studying → practiced → tested.

export type LessonStage =
  | 'parable'    // Elder hasn't been heard yet (or is about to speak)
  | 'studying'   // parable & directive heard; theory + practice at the Cinder
  | 'practiced'  // hit practiceTarget correct answers; ready to be tested
  | 'tested';    // test passed at Elder Fire; ready for next lesson

export interface ParableContent {
  title: string;
  paragraphs: string[];
  directive: string;
}

// Each theory page is a single sentence/idea with an optional equation
// directly under it. This pairs each math statement with the prose that
// introduces it — reads cleanly both in static reference view and in the
// Cinder's conversational walk-through.
export interface TheoryPage {
  text: string;        // inline markup supported: *italic*, $latex$
  math?: string;       // optional display equation (LaTeX, rendered by KaTeX)
}

export interface Lesson {
  id: string;
  /** Index into the 21-family taxonomy from the bible (§14, iteration 6). */
  family: number;
  parable: ParableContent;
  /** Cinder's conversational lead-in lines before the formal theory. */
  cinderIntro: string[];
  theory: TheoryPage[];
  /** Number of correct answers required at the Cinder before "practiced". */
  practiceTarget: number;
}
