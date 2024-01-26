export type staticComponentProps = {
  children?: React.ReactNode,
  className?: string,
};

// Generics
export type toggleBoolean = boolean;

// Note
export type note = {
  id: number,
  title?: string,
  body?: string,
  note_order: number,
  folder: boolean,
  folder_id: number,
}
