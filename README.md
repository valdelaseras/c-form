# Table of Contents

- [Web component form module](#web-component-form-module)
    - [CFormQuestion components](#cformquestion-components)
        - [Examples](#examples)
            - [c-checkbox](#c-checkbox)
            - [c-choice-group](#c-choice-group)
            - [c-input](#c-input)
            - [c-select](#c-select)
                - [Regular](#regular)
                - [With external data options](#with-external-data-options)
            - [c-textarea](#c-textarea)
            - [c-file-input](#c-file-input)
    - [Other components](#other-components)
        - [Examples](#examples-1)
            - [c-duplicable-form-question](#c-duplicable-form-question)
            - [c-fieldset](#c-fieldset)
            - [c-form](#c-form)

# Web component form module

A native web component form module. The components are made to be as flexible, un-opinionated, and as
close to the standard implementation of form elements as possible, while adding a bunch of convenient functionality to
make form implementation easier:

- basic validation on pristine and valid states
- display relevant helper texts if the form question is invalid
- intuitive form filling with key events only if you prefer to do so
- automatically adds asterisks at the end of labels for required fields in the right places
- drag and drop files into the file uploader, display relevant steps in the upload process
- optionally generate options for select elements from external data sources
- let the user duplicate `input` text fields to add multiple urls for instance
etc.

There are no set templates or styles: there are occasional elements, class names and attributes that are required
in order for c-form to work, these will be marked as such. Other than that, this approach offers a lot of flexibility to
do what you want.

There is a demo form in `index.html`. Please note that currently the demo is not built for beauty ; )

## CFormQuestion components

CFormQuestion is an abstract class that 'normal' form elements extend. You can find all of these in the `scripts/components/c-form-question` directory.

__For all of these components, the following implementation is required:__

- `.form-question`: on the root element ( ! unless a checkbox or radio is part of a group ).
- `[data-key]`: this will be the key in the FormData object.
- `.helper-text`: helper texts ( re invalid values ) will be displayed here. it's up to you to decide which element to use and where etc.

### Examples

Please find some implementation examples of CFormQuestion components below. Any additional required and optional classes or attributes are documented for the specific component.

#### c-checkbox

```html
<c-checkbox class="form-question"
            data-key="c-checkbox-key">
    <input type="checkbox"
           id="c-checkbox-id"
           tabindex="0"
           name="checkbox-demo"
           value="checkbox-solo"
           required/>
    <label for="c-checkbox-id">
        Label
    </label>
    <small class="helper-text"></small>
</c-checkbox>
```

#### c-choice-group

A choice group is a group of `input[type="radio"]` or `input[type="checkbox"]`

@required

`[data-group]`: add this attribute to the root of each nested choice element ( the radio or checkbox ). This leaves you the freedom to set the native `name` attribute differently if you wish to do so.

@optional

`[data-required]`: to make this form question required, add this attribute to the root element `<c-choice-group>`

```html
<c-choice-group class="form-question"
                data-key="c-choice-group-key"
                data-is-required>
    <label>
        Label
    </label>
    <c-checkbox data-group="c-choice-group-demo">
        <input type="checkbox"
               id="checkbox-a"
               tabindex="0"
               checked
               name="demo"
               value="checkbox-a"/>
        <label for="checkbox-a">
            Checkbox A
        </label>
    </c-checkbox>
    <c-checkbox data-group="c-choice-group-demo">
        <input type="checkbox"
               id="checkbox-b"
               name="demo"
               tabindex="0"
               value="checkbox-b"/>
        <label for="checkbox-b">
            Checkbox B
        </label>
    </c-checkbox>
    <c-checkbox data-group="c-choice-group-demo">
        <input type="checkbox"
               id="checkbox-c"
               name="demo"
               tabindex="0"
               value="checkbox-c"/>
        <label for="checkbox-c">
            Checkbox C
        </label>
    </c-checkbox>
    <small class="helper-text"></small>
</c-choice-group>
```

Alternatively, use radio inputs: 

```html
<c-radio data-group="c-choice-group-demo">
    <input type="radio"
           id="radio-a"
           tabindex="0"
           name="demo"
           value="radio-a"/>
    <label for="radio-a">
        Radio A
    </label>
</c-radio>
```

#### c-input

Input types may be common types like `text`, `email`, `tel`, `url` etc. 

- Use [c-checkbox](#c-checkbox) for type `checkbox`
- Use [c-radio](#c-choice-group) for type `radio` in a `c-choice-group`
- Use [c-file-input](#c-file-input) for type `file`

```html
<c-input class="form-question" 
         data-key="c-input-demo-key">
    <label for="c-input-demo">
        Label
    </label>
    <input id="c-input-demo"
           type="text"
           required/>
    <small class="helper-text"></small>
</c-input>
```

#### c-select

##### Regular

```html
<c-select class="form-question"
          data-key="c-select-regular-demo-key">
    <label for="c-select-demo">
        Label
    </label>
    <select id="c-select-demo"
            tabindex="0"
            required">
        <option value="foo">foo</option>
        <option value="faa">faa</option>
        <option value="fuu">fuu</option>
        <option value="fee">fee</option>
    </select>
    <small class="helper-text"></small>
</c-select>
```

##### With external data options

Another option is to have an external data source render the options of the select element automatically using a JSON 
or an array defined in some external file. This is useful for when you want to make a use an API to set all the options in
a select element ( like country calling codes for example ). You have to format the raw data to the following simple structure:

```javascript
[
    { label: 'a', value: 'a' },
    { label: 'b', value: 'b' },
    { label: 'c', value: 'c' }
] 
``` 

or as JSON:

```json
[
  { "label":  "a", "value":  "a" },
  { "label":  "b", "value":  "b" },
  { "label":  "c", "value":  "c" }
]
```

@required

`[data-external-options]`: add this attribute to the root element and set the value to the target exported `DataSource` 

```html
<c-select class="form-question"
          data-key="c-select-external-data-demo-key"
          data-external-options="sampleData">
    <label for="c-select-demo">
        Label
    </label>
    <select id="c-select-demo"
            tabindex="0"
            required">
    </select>
    <small class="helper-text"></small>
</c-select>
```

#### c-textarea

@optional

If you want to display a character counter on a set `textarea[maxlength]`, you can use these classes to display the 
maximum and current character count. Be sure not to forget to set the native `textarea[maxlength]`!

- `.char-counter`: a parent to the following elements:
  - `.counter`: the current character count
  - `.max-length`: the maxlength value will be displayed here

```html
<c-textarea class="form-question"
            data-key="c-textarea-demo-key">
    <label for="c-textarea-demo">
        Label
    </label>
    <textarea id="c-textarea-demo"
              tabindex="0"
              required
              maxlength="200"
              rows="4">
    </textarea>
    <div class="char-counter">
        <span class="counter"></span> /  <span class="maxlength"></span>
    </div>
    <small class="helper-text"></small>
</c-textarea>
```

#### c-file-input

@note
- `[accept]` is not required, but if you do add this attribute, be sure to add the long accepted file name like: `application/pdf`. This is because of the way the [DataTransferItem](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/type) handles types, which is slightly different from the `File` type when using a click event. 

@required 

- `.c-file-input-step`: the base class that defines different views in the upload process
  - `.file-selection-step`: the view before a file is selected
  - `.file-selected-step`: the view when a file has been selected.
  - `.hidden`: the class to hide the step that is currently not relevant

@optional

- `[data-max-size]` in bytes, if a maximum size is desired

```html
<c-file-input class="form-question"
              data-key="c-file-input-demo-key"
              data-max-size="5242880">
    <label tabindex="0" for="c-file-input-demo"></label>
    <input type="file"
           required
           accept=".doc,.docx,application/pdf,application/msword"
           id="c-file-input-demo"/>

    <!--step 1: file selection-->
    <div class="c-file-input-step file-selection-step">
        <h4 class="file-input-title">Label</h4>
        <span class="file-input-subtitle">
            Subtitle
        </span>
    </div>

    <!--step 2: file selected-->
    <div class="c-file-input-step file-selected-step hidden">
        <h4 class="file-input-title">Label</h4>
        <span class="file-input-subtitle">
            Subtitle
        </span>
    </div>

    <small class="helper-text"></small>
</c-file-input>
```

## Other components

Components that do not extend `CFormQuestion` but are 'wrapper' components to custom components that do extend `CFormQuestion`.
Note that these wrapper components to *not* have `[data-key]`, `.form-question` nor `.helper-text`: the nested children
that are CFormQuestions will have that. 

### Examples

#### c-duplicable-form-question

You can use this wrapper components to duplicate a form question a set number of times. This is useful when you want to
allow the user to add 1 or more urls to their work in an application form for instance. Unique IDs are automatically generated,
and the form question in FormData will look like the following:

```
{ 
    ...,
    portfolio: ['https://url-one.com','https://url-two.com','https://url-three.com'],
    ...
}
```

@required

- `.duplicable-element`: indicates which form question should be duplicable.

@optional 

- `[data-max]`: the maximum number of dupes. The default is 4, if you don't set this attribute.  
- `[data-required]`: if the original form question is required.

```html
 <c-duplicable-form-question data-max="4">
    <a class="button add-dupe-button"
       tabindex="0"
       role="button">+</a>
    <c-input class="form-question duplicable-element"
             data-key="portfolio">
        <label for="portfolio">
            Your portfolio urls
        </label>
        <input id="portfolio"
               placeholder="url"
               tabindex="0"
               type="url"
               name="portfolio"
               class="theme-secondary bordered"/>
        
        <small class="helper-text"></small>
    </c-input>
</c-duplicable-form-question>
```

#### c-fieldset

A c`-fieldset` is a grouping of, for instance, 2 form questions that belong together. Below is an example of a phone number form question where
we might want to use a calling-code API to populate a `c-select` element, and an additional `c-input[type="tel"]` for the remaining part of the
phone number. 

Note that the individual labels for the `.form-question` elements are rendered in the DOM but will *not* be visible in the UI: it is the `legend` that
will display one single label for the `c-fieldset`. The FormData for this will look like the following:

```
{ 
    ...,
    calling-code: '020',
    phone-number: '3456789',
    ...
}
```

```html
<c-fieldset data-is-required>
    <legend>
        Phone number
    </legend>
    <div class="row">
        <c-select class="form-question"
                  data-key="calling-code"
                  data-external-options="getSampleData">
            <label for="calling-code">country code</label>
            <select id="calling-code"
                    tabindex="0"
                    required>
                <option disabled selected>country code</option>
            </select>
            <small class="helper-text"></small>
        </c-select>
        <c-input class="form-question"
                 data-key="tel-number">
            <label for="c-input-tel-demo">phone number</label>
            <input type="tel"
                   id="c-input-tel-demo"
                   tabindex="0"
                   form="demo-form"
                   required/>
            <small class="helper-text"></small>
        </c-input>
    </div>
</c-fieldset>
```

#### c-form

```html
<c-form>
    <form class="c-form" id="demo-form">
        ...
    </form>
</c-form>
```


