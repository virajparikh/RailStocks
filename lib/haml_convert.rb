require_relative "../config/application.rb"

path = File.join(Rails.root, 'app', 'views')
Dir["#{path}/**/*"].each do |file|
  if file =~ /(.+)\.(html\.erb|rhtml)$/
    haml = "#{$1}.html.haml"
    puts "converting #{file}"
    File.open(haml, 'w') do |f|
      f.puts %x[html2haml -rx #{file}]
    end
    `rm #{file}`
  end
end