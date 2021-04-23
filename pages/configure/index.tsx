import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Layout from '../../components/Layout'
import Button from '../../components/Button';
import Box from '../../components/Box';
import clx from '../../utils/Html/clx';
import { Handle } from './Handle/Handle';
import useConfigureLogic from './configure.logic';
import css from './configure.module.scss';

export default function ConfigurePage() {
  const {
    headers,
    onDragEnd,
    toggleOption,
    back,
    next,
  } = useConfigureLogic();

  return (
    <Layout title="Re-arrange your data - CSV re-arranger">
      <h1>Configure data</h1>
      {!headers.length ? (
        <em>Resolving data...</em>
      ) : (
        <>
          <p>Re-arrange your data</p>
          <ul>
            <li>Drag to reorder the columns by heading</li>
            <li>Uncheck any columns you wish to exclude</li>
          </ul>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={css.dragCtnr}
                >
                  {headers.map((header, index) => (
                    <Draggable key={header.name} draggableId={header.name} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className={clx([
                            'flex --sec-center',
                            css.draggableHeading,
                            snapshot.isDragging && css.__dragging,
                            !header.enabled && css.__disabled,
                          ])}
                        >
                          <label>
                            <input type="checkbox" value="1" checked={header.enabled} onChange={() => toggleOption(header)} />
                            &nbsp;{header.name}
                          </label>
                          <Handle className={css._handle} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
      <Box mt={1} flex>
        <Box className={css.buttonCtnr}>
          <Button onClick={back} outline full-width-mobile>Back</Button>
        </Box>
        <Box ml={1} />
        <Box className={css.buttonCtnr}>
          <Button onClick={next} full-width-mobile>Next</Button>
        </Box>
      </Box>
    </Layout>
  );
}
