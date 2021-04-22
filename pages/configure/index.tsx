import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Layout from '../../components/Layout/Layout'
import Button from '../../components/Button/Button';
import Box from '../../components/Box/Box';
import { ComponentWithClassNames } from '../../types/ComponentWithClassNames';
import clx from '../../utils/Html/clx';
import useConfigureLogic from './configure.logic';
import css from './configure.module.scss';

function Handle(props: ComponentWithClassNames) {
  return (
    <span className={`${props.className ? clx(props.className) : ''} ${css.dragHandle}`}>
      &#8226;&#8226;&#8226;<br/>
      &#8226;&#8226;&#8226;
    </span>
  );
}

export default function ConfigurePage() {
  const {
    headers,
    onDragEnd,
    toggleOption,
    back,
    next,
  } = useConfigureLogic();

  return (
    <Layout title="Sample processor">
      <h1>Configure data</h1>
      {!headers.length ? (
        <em>Resolving data...</em>
      ) : (
        <>
          <p>Prioritise your data fields based on relative importance when matching candidates.</p>
          <ul>
            <li>Drag to reorder the fields</li>
            <li>Fields at the top have higher priority</li>
            <li>Uncheck any fields you wish to exclude</li>
          </ul>
          {/*
           Sample: https://codesandbox.io/s/k260nyxq9v?file=/index.js:585-1069
          */}
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
