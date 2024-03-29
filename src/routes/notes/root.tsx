import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Window from '../../components/Window/Window';
//context
import { UserContext } from '../../contexts/auth';
//types
import { note, toggleBoolean } from '../../types/types';
//components
import TopMenu from './components/TopMenu';
import { NoteTile, NoteTileClone, NewNoteTile } from './components/Tile';

//styles
import { LoaderGroup, LoaderRect } from '../../styles/Utility';


const preventPageScroll = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
}


const Notes = () => {
  const navigate = useNavigate();
  const { user, finishedLoadingUser } = useContext(UserContext);

  const [folderTitle, setFolderTitle] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null)

  const [notes, setNotes] = useState<note[]>([])
  const [folderStructureChanged, setFolderStructureChanged] = useState<toggleBoolean>(false);

  const [loaded, setLoaded] = useState<toggleBoolean>(false)
  const [checkedTileIds, setCheckedTileIds] = useState<number[]>([])

  const getNotes = async () => {
    setLoaded(false);
    // await new Promise(res => setTimeout(res, 20000)); // for loader styling
    if (user) {
      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user.id}/notes${folderId ? `?folder=${folderId}` : ''}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Replace "user.token" with the actual token
          },
        }).catch(() => 'Server is unresponsive'),
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve('Server is unresponsive');
          }, 5000);
        })
      ])
      if (resp instanceof Response) {
        if (resp.status === 200) {
          setLoaded(true);
          const data = await resp.json();
          if (data.folderTitle) {
            setFolderTitle(data.folderTitle);
          } else {
            setFolderTitle(null);
          }
          setNotes(data.notes)
        }
      } else {
        // append message
      }
    }
  }

  const deleteNote = async (noteId: string) => {
    console.log(noteId);
    if (user) {
      const resp = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Replace "user.token" with the actual token
          }
        }).catch(() => 'Server is unresponsive'),
        new Promise<string>((resolve) => {
          setTimeout(resolve, 10000)
        })
      ]);

      if (resp instanceof Response) {
        const data = await resp.json();
        console.log(data);
      } else {
        // append message server unresp...
      }
    }

  }

  const saveNotesOrder = async () => {
    if (user) {
      const notesMinimal = notes.map(({ id, note_order, folder_id }) => ({ id, note_order, folder_id }));

      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user.id}/notes`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Replace "user.token" with the actual token
          },
          body: JSON.stringify(notesMinimal),
        }).catch(() => 'Server is unresponsive'),
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve('Server is unresponsive');
          }, 5000);
        })
      ])
      if (resp instanceof Response) {
        if (resp.status === 200) {
          // show a notice to user
        } else {
          // show a notice to user
        }
      }
    }
  }

  const deleteNotes = async (checkedTileIds: number[]) => {
    if (user) {
      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user.id}/notes`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Replace "user.token" with the actual token
          },
          body: JSON.stringify(checkedTileIds),
        }).catch(() => 'Server is unresponsive'),
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve('Server is unresponsive');
          }, 5000);
        })
      ])
      if (resp instanceof Response) {
        return resp.status === 200;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedLoadingUser, folderId])

  const saveNewTileOrder = useCallback(() => {
    for (let i = 0; i < notes.length; i++) {
      notes[i].note_order = i;
    }
    saveNotesOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes])

  // -------- drag and drop
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [dragTargetIndex, setDragTargetIndex] = useState<number>(0);
  const [noteTileRefs, setNoteTileRefs] = useState<Array<HTMLAnchorElement>>([]);

  const dragCloneRef = useRef<HTMLDivElement>(null);


  const moveTile = (sourceIndex: number, targetIndex: number | null) => {
    const newNotes = [...notes];
    const [movingTile] = newNotes.splice(sourceIndex, 1);


    if (targetIndex !== null) {
      newNotes.splice(targetIndex, 0, movingTile);
      setDragTargetIndex(targetIndex);
    } else {
      newNotes.push(movingTile)
      setDragTargetIndex(notes.length - 1);
    }
    // Insert the element at the desired index

    // Update the state with the new array
    setNotes(newNotes);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    // prevent page scrolling on mobile
    document.addEventListener('touchmove', preventPageScroll, { passive: false })

    const baseTarget = e.target as HTMLElement;
    const target = baseTarget.nodeName === 'A' ? baseTarget : baseTarget.closest('a');
    setDragTargetIndex(index);
    setDragActive(true);
    if (dragCloneRef.current) {
      const clientX = (e as unknown as TouchEvent).targetTouches ? (e as unknown as TouchEvent).targetTouches[0].clientX : (e as unknown as MouseEvent).clientX;
      const clientY = (e as unknown as TouchEvent).targetTouches ? (e as unknown as TouchEvent).targetTouches[0].clientY : (e as unknown as MouseEvent).clientY;
      dragCloneRef.current.style.top = `${clientY}px`;
      dragCloneRef.current.style.left = `${clientX}px`;
      dragCloneRef.current.style.width = `${(target as HTMLAnchorElement).offsetWidth}px`;
      dragCloneRef.current.style.height = `${(target as HTMLAnchorElement).offsetHeight}px`;
    }
  }

  const handleDragEnd = () => {
    // re enable scrolling
    if (dragActive) {
      document.removeEventListener('touchmove', preventPageScroll);
      setDragActive(false);
      setDragTargetIndex(0);
      saveNewTileOrder();
    }
  }


  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragActive) {
      const clientX = (e as unknown as TouchEvent).targetTouches ? (e as unknown as TouchEvent).targetTouches[0].clientX : (e as unknown as MouseEvent).clientX;
      const clientY = (e as unknown as TouchEvent).targetTouches ? (e as unknown as TouchEvent).targetTouches[0].clientY : (e as unknown as MouseEvent).clientY;
      if (dragCloneRef.current) {
        dragCloneRef.current.style.top = `${clientY}px`;
        dragCloneRef.current.style.left = `${clientX}px`;

        type tileRepresentation = {
          index: number | null,
          leftOffset: number,
        };

        type tileRow = [
          topOffset: number,
          lastIndex: number,
          tileRepresentation[],
          last: boolean,
        ]

        // group by rows
        const tileRows: Array<tileRow> = [];
        const dragTileArea = dragCloneRef.current.getBoundingClientRect();

        noteTileRefs.forEach((tile: HTMLAnchorElement, index: number) => {
          const rect = tile.getBoundingClientRect();
          const leftOffset = Math.round(dragTileArea.x - rect.x - (rect.width / 2));
          const topOffset =  Math.round(dragTileArea.y - rect.y - (rect.height / 2));

          const rowIndex = tileRows.findIndex((row) => {
            return row[0] === topOffset;
          });

          if (rowIndex > -1) {
            tileRows[rowIndex][2].push({index, leftOffset});
            tileRows[rowIndex][1] = index;
          } else {
            tileRows.push([topOffset, index, [{index, leftOffset}], false]);
          }
        });

        tileRows[tileRows.length - 1][3] = true; // set as last

        // find closest row
        let closestRow: tileRow | number[] = [Number.MIN_SAFE_INTEGER];

        tileRows.forEach((tileRow) => {
          const topOffset = tileRow[0];
          if (topOffset < 0 && topOffset > closestRow[0]) {
            closestRow = tileRow;
          }
        })


        if (closestRow.length > 1) {
          // we have placeable row
          const rowTiles = (closestRow[2] as unknown as tileRepresentation[]);
          let closestTile: tileRepresentation = {index: null, leftOffset: Number.MIN_SAFE_INTEGER};
          rowTiles.forEach((tile: tileRepresentation) => {
            if (tile.leftOffset < 0 && tile.leftOffset > closestTile.leftOffset) {
              closestTile = tile;
            }
          });

          if (closestTile.index !== null) {
            moveTile(dragTargetIndex, closestTile.index);
          } else {
            // end of current row
            if (closestRow[3]) {
              // row is last row so simply move to end of group
              moveTile(dragTargetIndex, null);
            } else {
              // move to index after last in row
              moveTile(dragTargetIndex, closestRow[1] + 1);
            }
          }
        } else {
          // we put the tile to end of list
         moveTile(dragTargetIndex, null);
        }
      }
    }
  }

  const handleTileCheckedChange = (checked: boolean, id: number) => {
    const localCheckedTileIds = [...checkedTileIds];
    if (checked) {
      localCheckedTileIds.push(id);
    } else {
      if (localCheckedTileIds.includes(id)) {
        const inclusion = localCheckedTileIds.findIndex((n) => n === id);
        localCheckedTileIds.splice(inclusion, 1);
      }
    }
    setCheckedTileIds(localCheckedTileIds);
  }

  const deleteCheckedTiles = () => {
    if (checkedTileIds.length > 0) {
      const indices: number[] = [];
      for (let i = 0; i < checkedTileIds.length; i++) {
        indices.push(notes.findIndex((note) => note.id === checkedTileIds[i]));
      }
      const newNotes = notes.filter((note) => !checkedTileIds.includes(note.id));
      deleteNotes(checkedTileIds);
      setNotes(newNotes);

      // remove null refs
      const newRefs = noteTileRefs.filter((_, index) => !indices.includes(index));
      setNoteTileRefs(newRefs);
      setCheckedTileIds([]);
    }
  }

  useEffect(() => {
    if (folderStructureChanged) {
      const indices: number[] = [];
      for (let i = 0; i < checkedTileIds.length; i++) {
        indices.push(notes.findIndex((note) => note.id === checkedTileIds[i]));
      }
      saveNotesOrder();
      setFolderStructureChanged(true);
      setNotes(notes.filter((note) => !checkedTileIds.includes(note.id)))
      setCheckedTileIds([]);

      const newRefs = noteTileRefs.filter((_, index) => !indices.includes(index));
      setNoteTileRefs(newRefs);
      setCheckedTileIds([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderStructureChanged])

  const addNotesToFolder = (folderId: number) => {
    const newNotes = notes.map((note) => {
      if (checkedTileIds.includes(note.id)) {
        return {...note, folder_id: folderId}
      } else {
        return note;
      }
    })
    setNotes(newNotes);
    setFolderStructureChanged(true);
  }

  const createNote = async (folderId: string | null, folder: boolean) => {
    if (user) {
      const path = `/notes/new${folderId ? `?folder=${folderId}` : ''}${folder ? `?isFolder=${folder}` : ''}`;
      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}${path}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Replace "user.token" with the actual token
          },
        }).catch(() => 'Server is unresponsive'),
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve('Server is unresponsive');
          }, 5000);
        })
      ])
      if (resp instanceof Response) {
        if (resp.status === 200) {
          const data = await resp.json();
          handleNewNote(data.note)
          // show a notice to user
        } else {
          // show a notice to user
        }
      }
    }
  }


  const handleNewNote = (note: note) => {
    setNotes([...notes, note]);
  }

  return (
    <Window requestNavigate={navigate}>
      <div className="fileArea w-[50%] flex-grow h-full flex flex-col py-4 pr-4">
        <TopMenu loaded={loaded}
                  folderId={folderId}
                  addNotesToFolder={addNotesToFolder}
                  deleteCheckedTiles={deleteCheckedTiles}
                  notes={notes}
                  checkedTileIds={checkedTileIds}
                  folderTitle={folderTitle}
                  setFolderId={setFolderId}
                  handleNewNote={handleNewNote}
                  createNote={createNote}
                  deleteNote={deleteNote}/>
        <div className={`customScrollBar  ${dragActive ? '' : 'maskedListVert'} mt-5 px-8 p-[20px] w-full h-[50%] flex-grow overflow-y-scroll
                                                overflow-x-auto
                                                grid gap-4
                                                grid-cols-1 auto-rows-min
                                                min-[385px]:grid-cols-2 min-[450px]:grid-cols-3
                                                min-[600px]:grid-cols-4 min-[750px]:grid-cols-5
                                                min-[900px]:grid-cols-6

                                                `}
            onMouseMove={handleDragMove}
            onTouchMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
            >
          {loaded ? (
            <>
              <NewNoteTile folder={false}
                          folderId={folderId}
                          createNote={createNote}/>
              {notes.map((note, index) => (
                  <NoteTile
                    ref={(el: HTMLAnchorElement) => {
                      const localNoteTileRefs = noteTileRefs;
                      localNoteTileRefs[index] = el;
                      setNoteTileRefs(localNoteTileRefs);}}
                    moving={index === dragTargetIndex && dragActive}
                    index={index}
                    key={note.id}
                    note={note}
                    onDragStart={(e: React.MouseEvent) => handleDragStart(e, index)}
                    onTouchStart={(e: React.TouchEvent) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onCheckedChange={(checked: boolean) => {handleTileCheckedChange(checked, note.id)}}
                    requestFolderId={(id: string) => setFolderId(id)}/>
              ))}
              {notes.length > 0 ? (
                <NoteTileClone ref={dragCloneRef}
                                  note={notes[dragTargetIndex]}
                                  active={dragActive}
                                  onMouseUp={handleDragEnd}
                                  onTouchEnd={handleDragEnd}/>
              ) : ''}
            </>
          ):
          (
            <>
              <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
                <LoaderRect className='w-full h-full rounded-md'/>
              </LoaderGroup>
              <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
                <LoaderRect className='w-full h-full rounded-md'/>
              </LoaderGroup>
              <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
                <LoaderRect className='w-full h-full rounded-md'/>
              </LoaderGroup>
              <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
                <LoaderRect className='w-full h-full rounded-md'/>
              </LoaderGroup>
              <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
                <LoaderRect className='w-full h-full rounded-md'/>
              </LoaderGroup>
              <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
                <LoaderRect className='w-full h-full rounded-md'/>
              </LoaderGroup>
              <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
                <LoaderRect className='w-full h-full rounded-md'/>
              </LoaderGroup>
              <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
                <LoaderRect className='w-full h-full rounded-md'/>
              </LoaderGroup>
            </>
          )}
          </div>
      </div>
    </Window>
  );
}

export default Notes;
