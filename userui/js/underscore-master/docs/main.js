(function() {
  let functions = document.querySelectorAll('[data-name]');
  let sections = document.querySelectorAll('.searchable_section');
  let searchInput = document.getElementById('function_filter');

  function searchValue() {
    return searchInput.value.trim().replace(/^_\.?/, '');
  }

  function strIn(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return b.indexOf(a) >= 0;
  }

  function doesMatch(element) {
    let name = element.getAttribute('data-name');
    let aliases = element.getAttribute('data-aliases') || '';
    let value = searchValue();
    return strIn(value, name) || strIn(value, aliases);
  }

  function filterElement(element) {
    element.style.display = doesMatch(element) ? '' : 'none';
  }

  function filterToc() {
    _.each(functions, filterElement);

    let emptySearch = searchValue() === '';

    // Hide the titles of empty sections
    _.each(sections, function(section) {
      let sectionFunctions = section.querySelectorAll('[data-name]');
      let showSection = emptySearch || _.some(sectionFunctions, doesMatch);
      section.style.display = showSection ? '' : 'none';
    });
  }

  function gotoFirst() {
    let firstFunction = _.find(functions, doesMatch);
    if (firstFunction) {
      window.location.hash = firstFunction.getAttribute('data-name');
      searchInput.focus();
    }
  }

  searchInput.addEventListener('input', filterToc, false);

  // Press "Enter" to jump to the first matching function
  searchInput.addEventListener('keypress', function(e) {
    if (e.which === 13) {
      gotoFirst();
    }
  });

  // Press "/" to search
  document.body.addEventListener('keyup', function(event) {
    if (191 === event.which) {
      searchInput.focus();
    }
  });
}());
