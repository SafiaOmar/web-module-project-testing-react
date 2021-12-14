import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

test('renders without errors', ()=>{
    render(<Show show={{
        name:'',
        summary:'',
        seasons:[
            {
                id:0,
                name:'Season 1',
                episodes:[]
            },
            {
                id:1,
                name:'Season 2',
                episodes:[]
            }
        ]
    }} selectedSeason={"none"}/>)
});


test('renders Loading component when prop show is null', () => {
    render(<Show show={null}/>)
    const message = screen.queryByText(/fetching data.../i)
    expect(message).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={{
        name:'',
        summary:'',
        seasons:[
            {
                id:0,
                name:'Season 1',
                episodes:[]
            },
            {
                id:1,
                name:'Season 2',
                episodes:[]
            }
        ]
    }} selectedSeason={'none'}/>)

    const season = screen.queryAllByTestId('season-option')

    expect(season).toHaveLength(2);
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();

    render(<Show show={{
        name:'',
        summary:'',
        seasons:[
            {
                id:0,
                name:'Season 1',
                episodes:[]
            },
            {
                id:1,
                name:'Season 2',
                episodes:[]
            }
        ]
    }} selectedSeason={'none'} handleSelect={handleSelect} />)

    const select = screen.getByLabelText(/select a season/i)

    userEvent.selectOptions(select, ['1']);

    expect(handleSelect).toBeCalled();  
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={{
        name:'',
        summary:'',
        seasons:[
            {
                id:0,
                name:'Season 1',
                episodes:[]
            },
            {
                id:1,
                name:'Season 2',
                episodes:[]
            }
        ]
    }} selectedSeason={'none'}/>)
    let episode = screen.queryByTestId('episodes-container');

    expect(episode).not.toBeInTheDocument();

    rerender(<Show show={{
        name:'',
        summary:'',
        seasons:[
            {
                id:0,
                name:'Season 1',
                episodes:[]
            },
            {
                id:1,
                name:'Season 2',
                episodes:[]
            }
        ]
    }} selectedSeason={1}/>)

    episode = screen.queryByTestId('episodes-container');
    expect(episode).toBeInTheDocument();
});
