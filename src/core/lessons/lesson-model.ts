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

export interface TheorySection {
  type: 'paragraph' | 'math';
  content: string;  // for 'math': LaTeX source rendered by KaTeX
}

export interface Lesson {
  id: string;
  /** Index into the 18-family taxonomy from the bible (§14). */
  family: number;
  parable: ParableContent;
  theory: TheorySection[];
  /** Number of correct answers required at the Cinder before "practiced". */
  practiceTarget: number;
}
