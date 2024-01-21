export type staticComponentProps = {
  children?: React.ReactNode,
  className?: string,
};


export type toggle = boolean;



// Note

export type note = {
  id: number,
  title?: string,
  body?: string,
  note_order: number,
  folder: boolean,
  folder_id: number,
}
