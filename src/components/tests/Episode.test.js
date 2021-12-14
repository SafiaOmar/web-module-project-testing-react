import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


test("renders without error", () => {
    render(<Episode episode={{}} />)
});

test("renders the summary test passed as prop", ()=>{ render(<Episode episode={{
    id: 1,
    image: 'https://static.tvmaze.com/uploads/images/medium_landscape/204/510098.jpg',
    name: '"Chapter Four: The Body"',
    season: 1,
    number: 4,
    summary: "Refusing to believe Will is dead, Joyce tries to connect with her son. The boys give Eleven a makeover in order to connect with Will. Nancy and Jonathan form an unlikely alliance.",
    runtime: 51
}} />)

const summary = screen.queryByText(/Refusing to believe Will is dead, Joyce tries to connect with her son. The boys give Eleven a makeover in order to connect with Will. Nancy and Jonathan form an unlikely alliance/i)

expect(summary).toBeInTheDocument()

});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={{
        id: 1,
        image: null,
        name: '"Chapter Four: The Body"',
        season:1,
        number: 4,
        summary: "Refusing to believe Will is dead, Joyce tries to connect with her son. The boys give Eleven a makeover in order to connect with Will. Nancy and Jonathan form an unlikely alliance.",
        runtime: 51
    }} />)

    const img = screen.queryByRole('img')
    console.log('here', img)

    expect(img).toHaveProperty('src','https://i.ibb.co/2FsfXqM/stranger-things.png')
});