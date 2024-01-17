import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
//context
import { UserContext } from '../../../../auth';
//types
import { note } from '../../../../types/types';
//components
import { NoteTile, NewNoteTile, NoteTileClone } from './components/Tile';
//icons
import { LoaderGroup, LoaderRect } from '../../../../styles/Utility';

const Notes = () => {
  const [notes, setNotes] = useState<note[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const { user } = useContext(UserContext);


  const getNotes = async () => {
    if (user) {
      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user.id}/notes`, {
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
        }
        const data = await resp.json();
        setNotes(data.notes)
      }
    }
  }

  const saveNotes = async () => {
    if (user) {
      const noteIdsOrders = notes.map(({ id, order }) => ({ id, order }));

      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user.id}/notes`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Replace "user.token" with the actual token
          },
          body: JSON.stringify(noteIdsOrders),
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

  useEffect(() => {
    getNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveNewTileOrder = useCallback(() => {
    for (let i = 0; i < notes.length; i++) {
      notes[i].order = i;
    }
    saveNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes])

  // -------- drag and drop
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [dragTargetIndex, setDragTargetIndex] = useState<number>(0);

  const noteTileRefs = useRef<Array<HTMLAnchorElement>>([]);

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
    console.clear();
    console.log(e);
    const baseTarget = e.target as HTMLElement;
    const target = baseTarget.nodeName === 'A' ? baseTarget : baseTarget.offsetParent;
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
    setDragActive(false);
    setDragTargetIndex(0);
    saveNewTileOrder();
  }


  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
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
        noteTileRefs.current.forEach((tile: HTMLAnchorElement, index: number) => {
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

  return (
    <>
      <h2>{loaded ? (<>Your notes ({notes.length})</>) : (<>Loading...</>)}</h2>
      <div className={`customScroll pr-4 mt-4 w-full h-fit max-h-[75%] overflow-y-scroll
                                              overflow-x-auto
                                              grid gap-4 min-[400px]:grid-cols-2
                                              sm:grid-cols-3 md:grid-cols-4
                                              min-[900px]:grid-cols-5 lg:grid-cols-6 grid-rows-auto
                                              `}
           onMouseMove={handleDragMove}
           onTouchMove={handleDragMove}
           onMouseUp={handleDragEnd}
           onTouchEnd={handleDragEnd}>
        {loaded ? (
          <>
            <NewNoteTile/>
            {notes.map((note, index) => (
                <NoteTile
                  ref={(el: HTMLAnchorElement) => noteTileRefs.current[index] = el}
                  moving={index === dragTargetIndex && dragActive}
                  index={index}
                  key={note.id}
                  note={note}
                  onDragStart={(e: React.MouseEvent) => handleDragStart(e, index)}
                  onTouchStart={(e: React.TouchEvent) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}/>
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
    </>
  );
}

export default Notes;
