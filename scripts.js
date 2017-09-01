// Checks argument sent to url and returns it formatted
// to UTC or nothing
module.exports.parseArgument = (args) => {
    if(/\d/.test(args)) {
        if(/\D/.test(args)) {
            const [a, b, c] = args
                .split(/(?:\%20|\,|-|\.)/)
                .filter((i) => i !== '')
                .splice(0,3);

                    // If Date throws an error, the error is returned
                    try {
                        const year = new Date(`${a} ${b} ${c}`),
                              error = "Invalid Date",
                              utcFormated = parseInt(Math.floor(year / 1000));
                        if(year == error) throw new Error(year);
                        return {
                            "unix": utcFormated,
                            "natural": year.toUTCString()
                        };
                    }
                    catch(err) {
                        return {"error": err.message};
                    }

        }
        // If all there is is numbers
        else {
            // If Date throws an error, the error is returned
            try {
                const validUTC = new Date(0),
                      error    = "Invalid Date";
                validUTC.setTime(args * 1000); // Conversion of provided seconds

                if(validUTC == error) throw new Error(error);
                return {
                    "unix": parseInt(args),
                    "natural": validUTC.toUTCString()
                };
            }
            catch(err) {
                return {"error": err.message};
            }
        }
    }
    // If no numbers are present
    else {
        return {"error": "Please enter a valid date"};
    }
}
