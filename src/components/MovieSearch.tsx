import { useEffect, useState } from "react";

function MovieSearch() {
    const [input, setInput] = useState('');

    function handleSubmit(event: Event) {
        event.preventDefault();
    }

    // Show dropdown results when input is greated than 2
    useEffect(() => {
        if(input.length > 2) {
            console.log(input);
        }
    }, [input]);

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={event => setInput(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default MovieSearch;