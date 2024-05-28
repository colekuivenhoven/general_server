const print_connection = (route, request) => {
    const ip = (request.socket.remoteAddress).substring((request.socket.remoteAddress).lastIndexOf(':')+1);
    console.log(`(${route}) Request from IP: ${ip}`);
}

module.exports = {
    print_connection
}