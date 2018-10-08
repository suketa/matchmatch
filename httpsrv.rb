#!/usr/bin/env ruby
require 'webrick'
port = ARGV.shift || 28_080

srv = WEBrick::HTTPServer.new(
  Port: port,
  DocumentRoot: '.'
)

trap('INT') { srv.shutdown }
srv.start
