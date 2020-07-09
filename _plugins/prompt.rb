# This "hook" is executed right before the site's pages are rendered
Jekyll::Hooks.register :site, :pre_render do |site|
  puts "Registering minimal prompt lexer..."
  require "rouge"

  class Prompt < Rouge::RegexLexer
    title "prompt"
    desc "Minimal prompt for various interactive sessions (shell, python, venv, psql)"

    tag 'prompt'
    aliases 'prompt'

    state :root do
      rule %r/^\$\s+/, Name::Variable
      rule %r/^\(venv\)\s+\$\s+/, Name::Variable
      rule %r/^>>>\s+/, Name::Variable
      rule %r/^[a-z]+=#\s+/, Name::Variable
      rule %r/.+/, Text
      rule %r/\n/, Text
    end
  end
end
