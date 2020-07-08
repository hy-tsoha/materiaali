# This "hook" is executed right before the site's pages are rendered
Jekyll::Hooks.register :site, :pre_render do |site|
  puts "Registering minimal prompt lexer..."
  require "rouge"

  class Prompt < Rouge::RegexLexer
    title "prompt"
    desc "Minimal terminal prompt"

    tag 'prompt'
    aliases 'prompt'

    state :root do
      rule %r/\$\s+/, Name::Variable
      rule %r/.+/, Text
    end
  end
end
