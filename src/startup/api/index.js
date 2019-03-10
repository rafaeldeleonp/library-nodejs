import apiResources from './resources';

export default function startup(params) {
  const {Server, Logger} = params;

  Server.events.on('response', function(request) {
    Logger.debug({
      cycle: 'response',
      method: request.method,
      path: request.path,
      mime: request.mime,
      status: request.response.statusCode,
      remoteAddress: request.info.remoteAddress,
    });
  });

  apiResources.forEach(r => r(params));
}
